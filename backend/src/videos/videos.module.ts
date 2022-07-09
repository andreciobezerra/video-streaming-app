import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { diskStorage } from 'multer';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Video, VideoSchema } from './entities/video.entity';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, callback) => {
          const ext = file.mimetype.split('/')[1];

          callback(null, `${uuidv4}-${Date.now()}.${ext}`);
        },
      }),
    }),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
