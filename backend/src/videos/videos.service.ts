import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>) {}

  async create(video: Record<string, unknown>) {
    const newVideo = new this.videoModel(video);

    return newVideo.save();
  }

  findAll() {
    return this.videoModel.find().populate('createdBy').exec();
  }

  async findOne(id: string) {
    const video = await this.videoModel.findOne({ _id: id }).populate('createdBy').exec();

    if (!video) {
      throw new NotFoundException('Video not found.');
    }

    return video;
  }

  update(id: string, video: Video) {
    return this.videoModel.findByIdAndUpdate(id, video, { new: true });
  }

  delete(id: string) {
    return this.videoModel.findByIdAndRemove(id);
  }

  async stream() {
    throw new Error('Not implemented yet!');
  }
}
