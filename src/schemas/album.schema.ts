import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  name: string;
  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist: Types.ObjectId;
  @Prop({ default: null })
  coverImage: string;
  @Prop({ required: true })
  releaseYear: number;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
