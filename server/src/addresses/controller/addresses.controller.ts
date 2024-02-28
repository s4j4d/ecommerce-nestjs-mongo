import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AdminProfileDto } from '../dtos/admin.profile.dto';
import { AddressDto } from '../dtos/address.dto';
import { AddresssService } from '../services/users.service';

@Serialize(AddressDto)
@Controller('addresses')
export class AddresssController {
  constructor(private usersService: AddresssService) {}

  @UseGuards(AdminGuard)
  @Get()
  getAddresses() {
    return this.usersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteAddress(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  getAddress(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateAddress(
    @Param('id') id: string,
    @Body() credentials: AdminProfileDto
  ) {
    return this.usersService.adminUpdate(id, credentials);
  }
}
