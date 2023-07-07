import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Like, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { IPost } from './posts.types';
import { CreatePostDto } from './dto/posts.dto';

const Parser = require('rss-parser');

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private repository: Repository<Posts>,
  ) {}

  async findPost(id: number) {
    const post = await this.repository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async updatePost(id: number, body: any) {
    try {
      await this.repository.update(id, body);
    } catch (error) {
      return 'Failed to update the post';
    }
  }

  async deletePost(id: number) {
    return this.repository.delete(id);
  }

  async createPost(createPostDto: CreatePostDto) {
    const { categories, ...rest } = createPostDto;
    console.log(createPostDto);
    let strCategories;
    if (Array.isArray(categories)) {
      strCategories = categories.join(',');
    } else {
      strCategories = categories;
    }

    try {
      const newPost = this.repository.create({
        ...rest,
        categories: strCategories,
      });
      await this.repository.save(newPost);
      return 'Successfully created a post!';
    } catch (error) {
      throw new Error('Failed to create new post, try again later!');
    }
  }

  async searchPosts(title: string = null) {
    try {
      if (!title) {
        const res = await this.getPostsFromDB();
        return res;
      }

      let foundPosts = await this.repository.find({
        where: { title: Like(`%${title}%`) },
      });

      return { posts: foundPosts, page: Math.ceil(foundPosts.length / 10) };
    } catch (error) {
      return `Failed to find posts with ${title} paramaters`;
    }
  }

  async getPostsFromDB(count: number = null) {
    try {
      let posts = await this.repository.find();

      if (!posts.length) {
        posts = await this.compareFeed([], await this.fetchPostsFromFeed());
      }

      const page = Math.floor(posts.length / 10);
      if (count && count * 10 <= posts.length) {
        posts = posts.slice(count * 10, count * 10 + 10);
        return { posts, page: page };
      }

      return { posts, page } || [];
    } catch (error) {
      throw new Error('Failed to fetch posts, please try again later!');
    }
  }

  async compareFeed(dbFeed: any = [], feed: Posts[]) {
    let newItems = [];

    if (feed.length > dbFeed.length) {
      newItems = feed.slice(feed.length - (feed.length - dbFeed.length));

      for (const item of newItems) {
        await this.createPost(item);
      }

      return feed;
    }

    return [] as Posts[];
  }

  async fetchPostsFromFeed(): Promise<Posts[]> {
    try {
      let parser = new Parser();
      let feed = await parser.parseURL('https://lifehacker.com/rss');
      return feed.items;
    } catch (err) {
      throw new Error('Failed to fetch new posts from feed');
    }
  }

  @Cron('*/10 * * * *')
  async handleCron(): Promise<string> {
    try {
      let currentPosts = await this.fetchPostsFromFeed();
      let dbFeed: any = await this.getPostsFromDB();
      await this.compareFeed(dbFeed.posts, currentPosts);
    } catch (err) {
      return err.message;
    }
  }
}
