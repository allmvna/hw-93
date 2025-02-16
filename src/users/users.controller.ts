import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './register-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  @Post()
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    const user: UserDocument = new this.userModel({
      email: registerUserDto.email,
      password: registerUserDto.password,
      displayName: registerUserDto.displayName,
    });
    user.generateToken();
    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  login(@Req() req: Request<{ user: User }>) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Get('secret')
  secret(@Req() req: Request<{ user: User }>) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Delete('sessions')
  async logout(@Req() req: Request) {
    const token = req.headers.authorization;

    const success = { message: 'Successfully logged out' };

    if (!token) {
      return success;
    }

    const user = await this.userModel.findOne({ token });

    if (!user) {
      return success;
    }

    user.generateToken();
    await user.save();

    return success;
  }
}
