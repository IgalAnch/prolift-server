import { Property } from './property.entity';
import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Subscription,
} from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { forwardRef, Inject } from '@nestjs/common';
import { ProductService } from '../../product.service';

import { PubSub } from 'graphql-subscriptions'; //pub subbbbbbbbbbbbbbbbbb

const pubSub = new PubSub(); //pubsub

//@UseGuards(RolesGuard)
@Resolver()
export class PropertyResolver {
  constructor(
    private propertyService: PropertyService,
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {} //

  @Query(returns => Property) //generate method as Query
  async property(@Args('id', { type: () => Int }) id: number) {
    return this.propertyService.findById(id);
  }

  @Mutation(returns => Property)
  async addProperty(@Args('text') text: string) {
    let n1 = this.propertyService.addProp(text);
    pubSub.publish('propertyAdded', { propertyAdded: n1 });
    return n1;
  }

  @Subscription(returns => Property, { name: 'propertyAdded' })
  addPropertyHandler() {
    return pubSub.asyncIterator('propertyAdded');
  }
}
