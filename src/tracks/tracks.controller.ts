import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Track, TrackDocument } from '../schemas/track.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTrackDto } from './create-track-dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/enums.role';
import { RolesGuard } from '../roles/roles.guard';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}
  @Get()
  async getAll(@Query('albumId') albumId: string) {
    if (albumId) {
      return this.trackModel.find({ album: albumId }).populate('album').exec();
    }
    return this.trackModel.find().populate('album').exec();
  }
  @Post()
  @UseGuards(TokenAuthGuard)
  async create(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      name: trackDto.name,
      album: trackDto.album,
      duration: trackDto.duration,
      trackNumber: trackDto.trackNumber,
    });
    return await track.save();
  }
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(TokenAuthGuard, RolesGuard)
  async deleteOne(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid format`);
    }
    const deletedTrack = await this.trackModel.findByIdAndDelete(id).exec();
    if (!deletedTrack) {
      throw new NotFoundException(`Track not found`);
    }
    return { message: 'Track deleted successfully', track: deletedTrack };
  }
}
