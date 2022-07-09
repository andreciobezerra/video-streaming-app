import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() user: SignupDto) {
    return this.authService.signup(user);
  }

  @Post('/signin')
  signin(@Body() login: SigninDto) {
    return this.authService.signin(login);
  }
}
