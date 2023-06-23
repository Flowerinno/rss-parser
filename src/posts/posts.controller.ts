import { Controller, Post, Get, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @Get()
  getPosts() {
    return this.service.getPostsFromDB();
  }

  @Post()
  createPost() {}

  @Delete()
  deletePost() {}

  @Post()
  searchPosts() { }
  
}
