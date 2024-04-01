import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { encryptPassword } from 'src/utils';
import { Address, AddressDocument } from '../schemas/addresses.schema';

@Injectable()
export class AddresssService {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) { }

  async create(address: Partial<AddressDocument>): Promise<AddressDocument> {
    const createdAddress = await this.addressModel.create(address);

    return createdAddress;
  }

  async findOne(email: string): Promise<AddressDocument> {
    const address = await this.addressModel.findOne({ email });

    return address;
  }

  async findById(id: string): Promise<AddressDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid address ID.');

    const address = await this.addressModel.findById(id);

    if (!address) throw new NotFoundException('Address not found.');

    return address;
  }

  async findAll(): Promise<AddressDocument[]> {
    const addresss = await this.addressModel.find();

    return addresss;
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid address ID.');

    const address = await this.addressModel.findById(id);

    if (!address) throw new NotFoundException('Address not found.');

    await address.remove();
  }

  async update(
    id: string,
    attrs: Partial<AddressDocument>
  ): Promise<AddressDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid address ID.');

    const address = await this.addressModel.findById(id);

    if (!address) throw new NotFoundException('Address not found.');

    address.name = attrs.name;
    address.city = attrs.city;
    address.address = attrs.address;
    address.province = attrs.province;
    address.postalCode = attrs.postalCode;

    const updatedAddress = await address.save();

    return updatedAddress;
  }

  // async adminUpdate(id: string, attrs: Partial<AddressDocument>) {
  //   if (!Types.ObjectId.isValid(id))
  //     throw new BadRequestException('Invalid address ID.');

  //   const address = await this.addressModel.findById(id);

  //   if (!address) throw new NotFoundException('Address not found.');

  //   const existingAddress = await this.findOne(attrs.email);

  //   if (existingAddress && existingAddress.email !== address.email)
  //     throw new BadRequestException('Email is already in use.');

  //   address.name = attrs.name || address.name;
  //   address.email = attrs.email || address.email;
  //   address.isAdmin = attrs.isAdmin !== undefined && attrs.isAdmin;

  //   const updatedAddress = await address.save();

  //   return updatedAddress;
  // }

  async deleteMany(): Promise<void> {
    await this.addressModel.deleteMany({});
  }
}
