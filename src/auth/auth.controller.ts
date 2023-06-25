import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    const res = this.authService.signIn(signInDto.username, signInDto.password);
    return res;
  }

  @Post('register')
  createUser(@Body() userDto: CreateUserDto) {
    const res = this.authService.createUser(userDto.username, userDto.password);
    return res;
  }
}
