import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VideosController } from './videos/videos.controller';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    AuthModule,
    UsersModule,
    VideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'video/:id', method: RequestMethod.GET })
      .forRoutes(VideosController);
  }
}
