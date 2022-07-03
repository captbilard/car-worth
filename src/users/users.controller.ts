import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.username, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    return user;
  }

  @Get()
  findAllUser(@Query('username') username: string) {
    return this.userService.find(username);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
