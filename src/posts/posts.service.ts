import { Injectable } from '@nestjs/common';
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
    try {
      this.repository.findOne({ where: { id } });
    } catch (error) {
      return 'Failed to find the post';
    }
  }

  async updatePost(id: number, body: IPost) {
    try {
      const updatedBody = { ...body, categories: body.categories as string };
      this.repository.update(id, updatedBody);
    } catch (error) {
      return 'Failed to update the post';
    }
  }

  async deletePost(id: number) {
    try {
      await this.repository.delete(id);
      return 'Successufully deleted the post.';
    } catch (error) {
      return 'Failed to delete the post, please try again.';
    }
  }

  async createPost(createPostDto: CreatePostDto) {
    const { categories, ...rest } = createPostDto;
    let strCategories;
    if (Array.isArray(categories)) {
      strCategories = categories.join(',');
    } else {
      strCategories = String(categories);
    }

    try {
      await this.repository.save({ ...rest, categories: strCategories });
    } catch (error) {
      throw new Error('Failed to create new post, try again later!');
    }
  }

  async searchPosts(title: string) {
    try {
      let foundPosts = await this.repository.find({
        where: { title: Like(`%${title}%`) },
      });
      return foundPosts;
    } catch (error) {
      return `Failed to find posts with ${title} paramaters`;
    }
  }

  async getPostsFromDB() {
    try {
      let posts = await this.repository.find();

      if (!posts.length) {
        posts = await this.compareFeed([], await this.fetchPostsFromFeed());
      }

      return posts || [];
    } catch (error) {
      throw new Error('Failed to fetch posts, please try again later!');
    }
  }

  async compareFeed(dbFeed: Posts[] | [], feed: Posts[]) {
    let newItems = [];

    if (feed.length > dbFeed.length) {
      newItems = feed.slice(feed.length - (feed.length - dbFeed.length));

      console.log('New posts found');
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
      let dbFeed = await this.getPostsFromDB();
      await this.compareFeed(dbFeed, currentPosts);
    } catch (err) {
      return err.message;
    }
  }
}
