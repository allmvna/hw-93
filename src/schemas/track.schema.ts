import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true })
  name: string;
  @Prop({ type: Types.ObjectId, ref: 'Album', required: true })
  album: Types.ObjectId;
  @Prop({ required: true })
  duration: string;
  @Prop({ required: true })
  trackNumber: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
