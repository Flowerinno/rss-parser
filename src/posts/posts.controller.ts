import { Controller, Post, Get, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) { }
    
  @Get()
  getPosts() {
      
  }

  @Post()
  createPost() {}

  @Delete()
  deletePost() {}
}
