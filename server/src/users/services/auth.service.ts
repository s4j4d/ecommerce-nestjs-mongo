import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils';
import { Redis } from 'ioredis'
import * as https from 'node:https'
import { OtpDto } from '../dtos';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  public readonly redis;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    this.redis = new Redis({
      port: 6379, // Redis port
      host: "127.0.0.1", // Redis host
      username: "default", // needs Redis >= 6
      password: "my-top-secret",
      db: 0, // Defaults to 0
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) throw new NotFoundException('Invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new BadRequestException('Invalid email or password');

    return user;
  }

  async login(username: string, userId: string) {
    const payload = { username, sub: userId };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findOne(email);

    if (existingUser) throw new BadRequestException('Email is already in use.');

    const encryptedPassword = await encryptPassword(password);

    const user = await this.usersService.create({
      email,
      password: encryptedPassword,
      isAdmin: false,
      name,
    });

    return user;
  }

  async sendOtp(data: OtpDto) {

    await this.redis.set(`otp_${data.userNumber}`)

    await new Promise((resolve, reject) => {
    })

    https.request({
      host: '192.168.1.1',
      port: 443,
      path: '/',
      method: 'GET',
      rejectUnauthorized: false,
      agent: false,
    }, (res) => {
      const body = [];
      res.on('data', (data) => {
        body.push(data);
      });
      res.on('end', () => {
        console.log(body.join(''));
      });
    });
    
    req.end();
    
    req.on('error', (err) => {
      console.log(err);
    });

    const user = await this.usersService.create({
      email,
      password: encryptedPassword,
      isAdmin: false,
      name,
    });

    return user;
  }
}
