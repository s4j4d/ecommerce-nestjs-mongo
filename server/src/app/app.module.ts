import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { UsersModule } from '../users/users.module';
import { CartModule } from '../cart/cart.module';
import { AddressesModule } from '../addresses/addresses.module';
import { connectDB } from '../utils/config';
import { ProductsModule } from '../products/products.module';
import { OrderModule } from '../orders/order.module';
// import { SeedsModule } from '../seeds/seeds.module';
import { AppController } from './controllers/app.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'], 
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB(
        configService.get<string>('MONGODB_PASSWORD'||'1234'),
        ConfigService.get<string>('MONGODB_URL'||'mongodb'),
        configService.get<string>('MONGODB_DATABASE_NAME'||'ecommerce')
      )
    }),
    CommandModule,
    ProductsModule,
    UsersModule,
    CartModule,
    OrderModule,
    CloudinaryModule,
    AddressesModule,
    PicturesModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
