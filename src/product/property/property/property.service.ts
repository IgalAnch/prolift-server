import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ProductService } from '../../product.service';
import { forwardRef, Inject } from '@nestjs/common';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) //experimental repository
    private readonly PropertyRepository: Repository<Property>,

    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  async findById(id: number): Promise<Property> {
    const Property = await this.PropertyRepository.findOne(id);
    if (!Property) {
      const errors = { Property: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return Property;
  }

  //
  async addProp(text): Promise<Property> {
    await this.PropertyRepository.insert({ text });
    let b = await this.PropertyRepository.find();
    return b[b.length - 1];
  }

  async addProperties(properties, id) {
    for (let i = 0; i < properties.length; i++) {
      let property = new Property();
      property.text = properties[i];
      property.product = id; //??????????????????????????????????? not product.id??

      await this.PropertyRepository.insert(property);
      //console.log('>AddProperties.SAVED (' + properties[i].id + ')');
    }
    //console.log('<AddProperties  END<');
  }

  async deleteAll() {
    console.log(' right before property delete all');
    await this.PropertyRepository.delete({});
    console.log(' right after property delete all');
    return null;
  }
}
