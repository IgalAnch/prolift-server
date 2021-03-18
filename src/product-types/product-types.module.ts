import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductTypesResolver } from './product-types.resolver';
import { ProductTypesService } from './product-types.service';
import { ProductTypes } from './product-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypes])],
  providers: [ProductTypesService, ProductTypesResolver],
  exports: [ProductTypesService],
})
export class ProductTypesModule {}
