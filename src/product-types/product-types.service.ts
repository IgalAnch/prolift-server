import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTypes } from './product-types.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductTypes)
    private readonly ProductTypesRepository: Repository<ProductTypes>,
  ) {}
  async getProductTypes(): Promise<ProductTypes[]> {
    let b = await this.ProductTypesRepository.find();
    return b;
  }
}
