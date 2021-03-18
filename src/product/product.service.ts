import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Property } from './property/property/property.entity';
import { PropertyService } from './property/property/property.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,

    private propertyService: PropertyService,
  ) {}

  async findById(id: number): Promise<Product> {
    const Product_post = await this.ProductRepository.findOne(id);
    if (!Product_post) {
      const errors = { ProductPost: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return Product_post;
  }

  //==================TEST SERVICE (FOR TEST RESOLVER QUERIES)=============
  /***Test* */
  async addSomePost(): Promise<Product> {
    let Product_post = new Product();
    let { id, name, image, type, properties } = Product_post;
    name = 'Lift Switch-of-a-thingie'; //
    image = 'wiki.image.com/ref123456678%'; //
    type = 'ok'; //
    Product_post = { id, name, image, type, properties };
    await this.ProductRepository.save(Product_post);
    return Product_post;
  }

  async findSkip(take, skip): Promise<Product[]> {
    let b = await this.ProductRepository.find({ take: take, skip: skip });
    return b;
  }

  async findSkipWhere(take, skip, type): Promise<Product[]> {
    let b = await this.ProductRepository.find({
      take: take,
      skip: skip,
      where: {
        type: type,
      },
    });
    return b;
  }

  //

  async addProduct(name, type, image, properties): Promise<Product> {
    let newProperties = [];
    for (let i = 0; i < properties.length; i++) {
      let property = new Property();
      property.text = properties[i];
      newProperties.push(property);
    }
    let obj = {
      name: name,
      type: type,
      image: image,
      properties: newProperties,
    };
    console.log(obj);
    await this.ProductRepository.insert(obj);
    let obj2 = await this.ProductRepository.find();
    console.log(obj2);
    await this.propertyService.addProperties(
      properties,
      obj2[obj2.length - 1].id,
    );
    return obj2[obj2.length - 1];
  }

  // ========================== REMOVE ALL POSTS FROM Product-US.================ (DISCARD LATER)
  async removePosts(): Promise<Product> {
    console.log('before property delete all');
    await this.propertyService.deleteAll();
    console.log('after property delete all');
    await this.ProductRepository.delete({});
    console.log('after product delete all');
    return null;
  }

  async findAllProperties(id): Promise<Property[]> {
    let someProduct = await this.ProductRepository.findOne(id, {
      relations: ['properties'], //IS THIS THE PROBLEM? BUT ITS ALL GOOD?
    });
    return someProduct.properties;
  }
  async findAll(): Promise<Product[]> {
    return await this.ProductRepository.find({
      select: ['id', 'name', 'type', 'image'],
      relations: ['properties'],
    });
  }

  async findByType(): Promise<Product[]> {
    return await this.ProductRepository.find({
      select: ['id', 'name', 'type', 'image'],
      relations: ['properties'],
    });
  }
}
