import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Artist, ArtistDocument } from '../schemas/artist.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArtistDto } from './create-artist-dto';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.artistModel.find();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', { dest: './public/uploads/artists' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtistDto,
  ) {
    const artist = new this.artistModel({
      name: artistDto.name,
      information: artistDto.information,
      photo: file ? '/uploads/artists/' + file.filename : null,
    });
    return await artist.save();
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.artistModel.findById(id).exec();
  }
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid format`);
    }
    const deletedArtist = await this.artistModel.findByIdAndDelete(id).exec();
    if (!deletedArtist) {
      throw new NotFoundException(`Artist not found`);
    }
    return { message: 'Artist deleted successfully', artist: deletedArtist };
  }
}
