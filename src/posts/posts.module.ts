import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from './posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
