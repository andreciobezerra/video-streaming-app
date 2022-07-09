import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  // eslint-disable-next-line prettier/prettier
  UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadVideoDto } from './dto/upload-video.dto';
import { Video } from './entities/video.entity';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() request,
    @Body() video: UploadVideoDto,
    // eslint-disable-next-line prettier/prettier
    @UploadedFiles() files: { video?: Express.Multer.File[]; cover?: Express.Multer.File[]; },
  ) {
    return this.videosService.create({
      createdBy: request.user,
      title: video.title,
      video: files.video[0].filename,
      coverImage: files.video[0].filename,
    });
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // deepcode ignore XSS: I don't know
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() video: Video) {
    return this.videosService.update(id, video);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.videosService.delete(id);
  }
}
