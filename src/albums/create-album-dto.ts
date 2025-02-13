import { Types } from 'mongoose';

export class CreateAlbumDto {
  name: string;
  coverImage: string;
  releaseYear: string;
  artist: Types.ObjectId;
}
