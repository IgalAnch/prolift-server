import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
//Entity+Model ff;
import { ProductTypes /*ProductTypesInput*/ } from './product-types.entity';
import { ProductTypesService } from './product-types.service';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
//import { PubSub } from 'graphql-subscriptions'; //pub subbbbbbbbbbbbbbbbbb
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

//const pubSub = new PubSub();//pubsub

@Resolver(ProductTypes)
export class ProductTypesResolver {
  constructor(
    @Inject(forwardRef(() => ProductTypesService))
    private ProductTypesService: ProductTypesService,
  ) {}
  @Query(returns => [ProductTypes])
  async getProductTypes() {
    return this.ProductTypesService.getProductTypes();
  }
}
