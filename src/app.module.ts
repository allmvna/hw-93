import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsController } from './albums/albums.controller';
import { Album, AlbumSchema } from './schemas/album.schema';
import { TracksController } from './tracks/tracks.controller';
import { Track, TrackSchema } from './schemas/track.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/musicApp2'),
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
    UsersController,
  ],
  providers: [AppService, AuthService, LocalStrategy],
})
export class AppModule {}
