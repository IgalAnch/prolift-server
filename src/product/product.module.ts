import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { PropertyModule } from './property/property/property.module';



@Module({
  imports:[TypeOrmModule.forFeature([Product]), forwardRef(()=>PropertyModule)],
   providers:[ProductService, ProductResolver,],
    exports:[ProductService]
})


export class ProductModule{

}