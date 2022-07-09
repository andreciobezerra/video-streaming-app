import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// deepcode ignore HardcodedNonCryptoSecret: To development purpose only.
const secret = 's038-pwpppwpeok-dffMjfjriru44030423-edmmfvnvdmjrp4l4k';

@Module({
  imports: [
    JwtModule.register({ secret, signOptions: { expiresIn: '2h' } }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
