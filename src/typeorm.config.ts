import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//Entities
import { Character } from './entity/character.entity';
import { Product } from './product/product.entity';
import { User } from './users/user.entity';
import { Card } from './card/card.entity';
import { ContactUs } from './contact_us/contact_us.entity';
import { TechSupport } from './tech_support/tech_support.entity';
import { Property } from './product/property/property/property.entity';
//import { Module } from '@nestjs/common';
import { ProductTypes } from './product-types/product-types.entity';
import { UserRoles } from './user-roles/user-roles.entity';
import { UserPremissions } from './user-premissions/user-premissions.entity';

//================== there are CHANGES IN THIS FILE with some JS FUNAMENTALS make sure to REMOVE LATER

export const TYPEORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'prolift_db',
  entities: [
    User,
    Character,
    Card,
    ContactUs,
    TechSupport,
    Product,
    Property,
    ProductTypes,
    UserRoles,
    UserPremissions,
  ],
  synchronize: true,
  //name:'prolift2'
  /* ^^^ if emitted name is "default". can make multiple database 
  connections by using different repository names*/
};
