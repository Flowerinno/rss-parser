import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
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

  async findPost(id: string) {}

  async updatePost(id: string, body: IPost) {}

  async deletePost(id: string) {}

  async createPost(createPostDto: CreatePostDto): Promise<void> {
    try {
      await this.repository.create(createPostDto);
    } catch (error) {
      throw new Error('Failed to create new post, try again later!');
    }
  }

  async searchPosts(title: string): Promise<Posts[]> {
    try {
      let foundPosts = await this.repository.findBy({ title });
      return foundPosts;
    } catch (error) {
      throw new Error(`Failed to find posts with ${title} paramaters`);
    }
  }

  async getPostsFromDB(): Promise<Posts[]> {
    try {
      let posts = await this.repository.find();

      if (!posts.length) {
        await this.handleCron();
        return;
      }

      return posts;
    } catch (error) {
      throw new Error('Failed to fetch posts, please try again later!');
    }
  }

  async compareFeed(dbFeed: Posts[], feed: Posts[]): Promise<Posts[]> {
    const newItems = feed.filter(
      (item) => !dbFeed.find((prevItem) => prevItem.link === item.link),
    );

    if (newItems.length > 0) {
      console.log('New posts found:');
      newItems.forEach(async (item) => {
        console.log('Title:', item.title);
        console.log('Link:', item.link);
        console.log('---------------------------');
        await this.createPost(item);
      });

      return feed;
    } else {
      throw new Error('No new posts have been found!');
    }
  }

  async fetchPostsFromFeed(): Promise<Posts[]> {
    try {
      let parser = new Parser();
      let feed = await parser.parseURL('https://lifehacker.com/rss');
      return feed;
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
