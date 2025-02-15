import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Track, TrackDocument } from '../schemas/track.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  async seed() {
    console.log('Start making fixtures');

    await this.albumModel.deleteMany({});
    await this.artistModel.deleteMany({});
    await this.trackModel.deleteMany({});

    console.log('Collection of MD was deleted successfully.');

    const artists = await this.artistModel.create([
      {
        name: 'Imagine Dragons',
        photo: 'fixtures/imagine-dragons.jpg',
        information: 'American pop rock band.',
      },
      {
        name: 'Billie Eilish',
        photo: 'fixtures/billie-eilish.jpg',
        information: 'American singer-songwriter known for her unique style.',
      },
      {
        name: 'Bruno Mars',
        photo: 'fixtures/bruno-mars.jpg',
        information: 'American singer, songwriter, and record producer.',
      },
    ]);

    const albums = await this.albumModel.create([
      {
        name: 'Evolve',
        artist: artists[0]._id,
        releaseYear: 2017,
        coverImage: 'fixtures/evolve.jpg',
      },
      {
        name: 'Night Visions',
        artist: artists[0]._id,
        releaseYear: 2012,
        coverImage: 'fixtures/night-visions.jpg',
      },
      {
        name: 'Happier Than Ever',
        artist: artists[1]._id,
        releaseYear: 2021,
        coverImage: 'fixtures/happier-than-ever.webp',
      },
      {
        name: 'Doo-Wops & Hooligans',
        artist: artists[2]._id,
        releaseYear: 2010,
        coverImage: 'fixtures/doo-wops.jpeg',
      },
      {
        name: 'Unorthodox Jukebox',
        artist: artists[2]._id,
        releaseYear: 2012,
        coverImage: 'fixtures/jukebox.jpg',
      },
    ]);

    await this.trackModel.create([
      {
        name: 'Believer',
        album: albums[0]._id,
        duration: 204,
        trackNumber: 1,
      },
      {
        name: 'Thunder',
        album: albums[0]._id,
        duration: 187,
        trackNumber: 2,
      },
      {
        name: 'Radioactive',
        album: albums[1]._id,
        duration: 197,
        trackNumber: 1,
      },
      {
        name: 'Demons',
        album: albums[1]._id,
        duration: 176,
        trackNumber: 2,
      },
      {
        name: 'Happier Than Ever',
        album: albums[2]._id,
        duration: 298,
        trackNumber: 1,
      },
      {
        name: 'NDA',
        album: albums[2]._id,
        duration: 210,
        trackNumber: 2,
      },
      {
        name: 'Just the Way You Are',
        album: albums[3]._id,
        duration: 222,
        trackNumber: 1,
      },
      {
        name: 'Grenade',
        album: albums[3]._id,
        duration: 231,
        trackNumber: 2,
      },
      {
        name: 'Locked Out of Heaven',
        album: albums[4]._id,
        duration: 236,
        trackNumber: 1,
      },
      {
        name: 'Treasure',
        album: albums[4]._id,
        duration: 194,
        trackNumber: 2,
      },
    ]);
  }
}
