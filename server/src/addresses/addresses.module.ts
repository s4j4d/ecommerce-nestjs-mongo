import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { Address, AddressSchema } from './schemas/addresses.schema';
import { AddresssService } from './services/addresses.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { AddresssController } from './controller/addresses.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Address.name,
        schema: AddressSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ AddresssController],
  providers: [AddresssService, LocalStrategy, JwtStrategy],
})
export class AddressesModule { }
