import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
//Entity+Model
import { Product /*ProductInput*/ } from './product.entity';
import { ProductService } from './product.service';
import { Property } from './property/property/property.entity';
import { PropertyService } from './property/property/property.service';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
//import { PubSub } from 'graphql-subscriptions'; //pub subbbbbbbbbbbbbbbbbb
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

//const pubSub = new PubSub();//pubsub

@Resolver(Product)
export class ProductResolver {
  constructor(
    @Inject(forwardRef(() => PropertyService))
    private PropertyService: PropertyService,
    private ProductService: ProductService,
  ) {}

  @Query(returns => Product) //generate method as Query
  async product(@Args('id', { type: () => Int }) id: number) {
    return this.ProductService.findById(id);
  } //cll bk frnd

  //<<<<<<<>>>>>>>>>>>>DELETE ALL POSTS QUERY<<<<<<<<<<>>>>>>>>>> (remove later)
  @Mutation(returns => Product)
  async removeAll_product() {
    return this.ProductService.removePosts();
  }
  @Mutation(returns => Product)
  async deleteAll_product() {
    return this.ProductService.removePosts();
  }

  //=================TEST QUERIES================

  @Mutation(returns => Product) //generate method as Query
  async add_product2() {
    return this.ProductService.addSomePost();
  }

  @Mutation(returns => Product) //generate method as Query
  async add_product(
    @Args('name') name: string,
    @Args('type') type: string,
    @Args('image') image: string,
    @Args({ name: 'properties', type: () => [String] }) properties: string[],
  ) {
    let n = await this.ProductService.addProduct(name, type, image, properties);

    return n;
  }

  //@UseGuards(JwtAuthGuard) //not supposed to be here
  @Query(returns => [Product])
  async productAll() {
    return this.ProductService.findAll();
  } //

  @Query(returns => [Product])
  async productType() {
    //check this
    return this.ProductService.findByType();
  }

  @Query(returns => [Product])
  async productGet(@Args('take') take: number, @Args('skip') skip: number) {
    return this.ProductService.findSkip(take, skip);
  }

  @Query(returns => [Product]) //minimalistic - duplicate function however
  async takeSkip(@Args('take') take: number, @Args('skip') skip: number) {
    return this.ProductService.findSkip(take, skip);
  }

  @UseGuards(JwtAuthGuard) //remove later TEST :: need to be logged in to use product infinite scroll funcs
  @Query(returns => [Product])
  async productGetWhere(
    @Args('take') take: number,
    @Args('skip') skip: number,
    @Args('type') type: string,
  ) {
    return this.ProductService.findSkipWhere(take, skip, type);
  }

  @Mutation(returns => Product) //protected properties // FIXXXXX
  async deleteProducts() {
    return this.ProductService.removePosts();
  }
  //kybnds
  @ResolveField()
  async properties(@Parent() product: Product) {
    return this.ProductService.findAllProperties(product.id);
  }
}
