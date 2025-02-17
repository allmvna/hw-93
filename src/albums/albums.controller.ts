import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './create-album-dto';
import { albumStorage } from '../config';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/enums.role';
import { RolesGuard } from '../roles/roles.guard';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAll(@Query('artistId') artistId: string) {
    if (artistId) {
      return this.albumModel
        .find({ artist: artistId })
        .populate('artist')
        .exec();
    }
    return this.albumModel.find().populate('artist').exec();
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.albumModel.findById(id).populate('artist').exec();
  }
  @Post()
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(FileInterceptor('coverImage', { storage: albumStorage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      name: albumDto.name,
      artist: albumDto.artist,
      releaseYear: albumDto.releaseYear,
      coverImage: file ? '/uploads/albums/' + file.filename : null,
    });
    return await album.save();
  }
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(TokenAuthGuard, RolesGuard)
  async deleteOne(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid format`);
    }
    const deletedAlbum = await this.albumModel.findByIdAndDelete(id).exec();
    if (!deletedAlbum) {
      throw new NotFoundException(`Album not found`);
    }
    return { message: 'Album deleted successfully', album: deletedAlbum };
  }
}
