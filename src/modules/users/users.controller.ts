import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../roles.enum';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 3) {
    console.log(page, limit);
    return this.usersService.getUsers(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  postUser(@Body() user: CreateUserDto) {
    return this.usersService.postUser(user);
  }

  @Put(':id')
  putUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: CreateUserDto) {
    // return this.usersService.updateUser(id, user);
    return this.usersService.putUser(user, id);
  }

  @Put('otroEj/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: CreateUserDto,
  ) {
    console.log(id);
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
