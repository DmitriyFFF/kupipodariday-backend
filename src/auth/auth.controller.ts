import {
  Controller,
  Req,
  Post,
  Body,
  UseGuards,
  // Get,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalGuard } from './guards/local.guard';
// import { JwtGuard } from './guards/jwt.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async login(@Req() req) {
    return this.authService.auth(req.user);
  }

  // @UseGuards(JwtGuard) //??
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return this.authService.auth(user);
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
