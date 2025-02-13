import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistsController } from './artists/artists.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/musicApp'),
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [AppController, ArtistsController],
  providers: [AppService],
})
export class AppModule {}
