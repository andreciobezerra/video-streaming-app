import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: SignupDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const newUser = new this.userModel({ ...user, password: hash });

    return newUser.save();
  }

  async signin(login: SigninDto) {
    const user = await this.userModel.findOne({ email: login.email }).exec();

    if (user) {
      const equalPassword = await bcrypt.compare(login.password, user.password);

      if (equalPassword) {
        return { token: this.jwtService.sign({ email: user.email }) };
      }
    }

    return new UnauthorizedException('Incorrect username or password');
  }
}
