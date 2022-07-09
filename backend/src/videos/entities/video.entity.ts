import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Video {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  video: string;

  @Prop()
  coverImage: string;

  @Prop({ default: Date.now() })
  uploadDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export type VideoDocument = Video & Document;
export const VideoSchema = SchemaFactory.createForClass(Video);
