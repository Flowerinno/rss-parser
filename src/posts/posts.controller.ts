import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from './posts.types';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @Get()
  async getPosts(@Query() query) {
    const res = await this.service.getPostsFromDB(query.count);
    return res;
  }

  @Get(':postId')
  async findPost(@Param() params) {
    const res = await this.service.findPost(params.postId);

    return res;
  }

  @Post('update')
  async updatePost(@Req() request: Request) {
    const { id, ...rest } = request.body;
    const res = await this.service.updatePost(id, rest);
    return res;
  }

  @Post()
  async createPost(@Body() body: IPost) {
    const res = await this.service.createPost(body);
    return res;
  }

  @Delete(':postId')
  async deletePost(@Param() params) {
    const res = await this.service.deletePost(params.postId);
    return res;
  }

  @Get('search')
  async searchPosts(@Query() query) {
    const res = await this.service.searchPosts(query.title);
    return res;
  }

  @Post('pop')
  async populateDB() {
    const res = this.service.compareFeed(
      [],
      await this.service.fetchPostsFromFeed(),
    );
    return res;
  }
}
