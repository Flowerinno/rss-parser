import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from './posts.types';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @Get()
  @ApiQuery({ example: 1, name: 'count', required: false, type: Number })
  async getPosts(@Query() query) {
    const res = await this.service.getPostsFromDB(query.count);
    return res;
  }

  @Get(':postId')
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
    description: 'Find post by postId',
  })
  async findPost(@Param('postId', ParseIntPipe) postId: number) {
    const res = await this.service.findPost(postId);

    return res;
  }

  @Post('update')
  async updatePost(@Req() request: Request) {
    const { id, ...rest } = request.body;
    const res = await this.service.updatePost(id, rest);
    return res;
  }

  @Post()
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({ status: 201, description: 'Successfully created a post' })
  async createPost(@Body() body: IPost) {
    const res = await this.service.createPost(body);
    return res;
  }

  @Delete(':postId')
  @ApiParam({ name: 'postId', required: true, type: String })
  async deletePost(@Param() params) {
    return this.service.deletePost(params.postId);
  }

  @Get('search')
  @ApiQuery({ name: 'title', required: true, type: String })
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
