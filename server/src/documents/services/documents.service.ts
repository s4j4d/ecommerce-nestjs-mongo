import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginatedDocuments } from 'src/interfaces';
import { UserDocument } from 'src/users/schemas/user.schema';
import { sampleProduct } from '../../utils/data/document';
import { Product, ProductDocument } from './schemas/document.schema';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Product.name) private documentModel: Model<ProductDocument>
  ) {}

  async findTopRated(): Promise<ProductDocument[]> {
    const documents = await this.documentModel
      .find({})
      .sort({ rating: -1 })
      .limit(3);

    if (!documents.length) throw new NotFoundException('No documents found.');

    return documents;
  }

  async findMany(
    keyword?: string,
    pageId?: string
  ): Promise<PaginatedDocuments> {
    const pageSize = 2;
    const page = parseInt(pageId) || 1;

    const rgex = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    const count = await this.documentModel.countDocuments({ ...rgex });
    const documents = await this.documentModel
      .find({ ...rgex })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (!documents.length) throw new NotFoundException('No documents found.');

    return { documents, page, pages: Math.ceil(count / pageSize) };
  }

  async findById(id: string): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid document ID.');

    const document = await this.documentModel.findById(id);

    if (!document) throw new NotFoundException('No document with given ID.');

    return document;
  }

  async createMany(
    documents: Partial<ProductDocument>[]
  ): Promise<ProductDocument[]> {
    const createdDocuments = await this.documentModel.insertMany(documents);

    return createdDocuments;
  }

  async createSample(): Promise<ProductDocument> {
    const createdProduct = await this.documentModel.create(sampleProduct);

    return createdProduct;
  }

  async update(
    id: string,
    attrs: Partial<ProductDocument>
  ): Promise<ProductDocument> {
    const { name, price, description, image, brand, category, countInStock } =
      attrs;

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid document ID.');

    const document = await this.documentModel.findById(id);

    if (!document) throw new NotFoundException('No document with given ID.');

    document.name = name;
    document.price = price;
    document.description = description;
    document.image = image;
    document.brand = brand;
    document.category = category;
    document.countInStock = countInStock;

    const updatedProduct = await document.save();

    return updatedProduct;
  }

  async createReview(
    id: string,
    user: Partial<UserDocument>,
    rating: number,
    comment: string
  ): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid document ID.');

    const document = await this.documentModel.findById(id);

    if (!document) throw new NotFoundException('No document with given ID.');

    const alreadyReviewed = document.reviews.find(
      r => r.user.toString() === user._id.toString()
    );

    if (alreadyReviewed)
      throw new BadRequestException('Product already reviewed!');

    const review = {
      name: user.name,
      rating,
      comment,
      user: user._id,
    };

    document.reviews.push(review);

    document.rating =
      document.reviews.reduce((acc, item) => item.rating + acc, 0) /
      document.reviews.length;

    document.numReviews = document.reviews.length;

    const updatedProduct = await document.save();

    return updatedProduct;
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid document ID.');

    const document = await this.documentModel.findById(id);

    if (!document) throw new NotFoundException('No document with given ID.');

    await document.remove();
  }

  async deleteMany(): Promise<void> {
    await this.documentModel.deleteMany({});
  }
}
