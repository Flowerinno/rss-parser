import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from './posts.types';

@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @Get()
  getPosts(@Query() query) {
    const res = this.service.getPostsFromDB(query.count);
    return res;
  }

  @Post()
  createPost(@Body() body: IPost) {
    const res = this.service.createPost(body);
    return res;
  }

  @Delete()
  deletePost(@Query() query) {
    const res = this.service.deletePost(query.id);
    return res;
  }

  @Get('search')
  searchPosts(@Query() query) {
    const res = this.service.searchPosts(query.title);
    return res;
  }
}
