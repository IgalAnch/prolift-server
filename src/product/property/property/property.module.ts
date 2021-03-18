import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
import { ProductModule } from '../../product.module';



@Module({
  imports:[TypeOrmModule.forFeature([Property]), forwardRef(()=>ProductModule)],
   providers:[PropertyService, PropertyResolver],
    exports:[PropertyService]
})


export class PropertyModule{

}