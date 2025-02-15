import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../schemas/track.schema';
import { SeederService } from './seeder.service';
import { Album, AlbumSchema } from '../schemas/album.schema';
import { Artist, ArtistSchema } from '../schemas/artist.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/musicApp2'),
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  providers: [SeederService],
})
export class SeedModule {}
