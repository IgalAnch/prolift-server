import {
  Controller,
  Req,
  Res,
  HttpStatus,
  Get,
  Post,
  UsePipes,
  Body,
  Param,
  NotFoundException,
  All,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { Request, Response } from 'express';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    @InjectConnection('default') //trying 1st connection/database
    private connection: Connection,
    private usersService: UsersService,
  ) {}

  @Get('holerat')
  findAll(@Req() req: Request, @Res() res: Response) {
    const user = new User();
    user.firstName = 'Timber3';
    user.lastName = 'Saw1';
    user.isActive = true;
    console.log('req gotten users');
    let obj = { hi: 'hello' };

    res.status(HttpStatus.ACCEPTED);
    res.send(obj);
    console.log('res send');
  }

  @Get('contact')
  getContact(@Req() req: Request, @Res() res: Response) {}

  @Get('all')
  getAllUsers(@Req() req: Request, @Res() res: Response) {
    this.usersService.findAll().then(users => {
      console.log(users);
      res.send(users);
    });
  }

  @Get('d') //delete
  deleteAllUsers(@Req() req: Request, @Res() res: Response) {
    this.usersService.deleteAll().then(users => {
      console.log(users);
      console.log('deleted?');
    });
    res.send('deleted');
  }

  @Post()
  queryTest(@Req() req: Request, @Res() res: Response) {
    let obj2 = { ok: 'ok' };
    res.status(HttpStatus.ACCEPTED);
    res.send(obj2);
  }

  @Get('idd')
  findOne(@Req() req: Request, @Res() res: Response) {
    this.usersService.findById(300).then(users => {
      console.log(users);
      res.send(users);
    });
  }

  @UsePipes(new ValidationPipe())
  @Post('c') //create
  async createUser(@Body() ok) {
    console.log('hi');
    let someUser = {
      username: 'o2k21232',
      email: '13k221@ok.ok',
      password: 'ok123',
      firstName: 'ok',
      lastName: 'ay',
    };
    return await this.usersService.create(ok).then(meta => {
      console.log(meta);
    });
  }
  //@Body('user') userData: CreateUserDto
  @Get(':id')
  async getUserById2(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    return { user };
  }
}

//const a=require("fs");
