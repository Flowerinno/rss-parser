import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

const Parser = require('rss-parser');

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  async createPost(createPostDto): Promise<Posts> {
    return;
  }

  async getPosts(): Promise<Posts> {
    return;
  }

  async compareFeed(dbFeed, feed) {
    let previousFeedItems = dbFeed;

    const newItems = feed.filter(
      (item) =>
        !previousFeedItems.find((prevItem) => prevItem.link === item.link),
    );

    if (newItems.length > 0) {
      console.log('New posts found:');
      newItems.forEach((item) => {
        console.log('Title:', item.title);
        console.log('Link:', item.link);
        console.log('---------------------------');
      });
      previousFeedItems = feed;
      //update Database feed
    } else {
      console.log('No new posts found.');
      return;
    }
  }

  async fetchPostsFromFeed() {
    try {
      let parser = new Parser();
      let feed = await parser.parseURL('https://lifehacker.com/rss');
      return feed;
    } catch (err) {
      return 'Failed to fetch new posts from feed';
    }
  }

  @Cron('2 * * * * *')
  handleCron() {
    console.log('cron is working');
  }
}
