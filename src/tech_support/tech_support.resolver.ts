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
import { TechSupport } from './tech_support.entity';
import { TechSupportService } from './tech_support.service';

//
@Resolver(TechSupport)
export class TechSupportResolver {
  constructor(private TechSupportService: TechSupportService) {}
  //
  @Query(returns => TechSupport) //generate method as Query
  async tech_support(@Args('id', { type: () => Int }) id: number) {
    return this.TechSupportService.findById(id);
  }

  //<<<<<<<>>>>>>>>>>>>DELETE ALL POSTS QUERY<<<<<<<<<<>>>>>>>>>> (remove later)
  @Mutation(returns => TechSupport)
  async removeAll_tech_support() {
    return this.TechSupportService.removePosts();
  }
  @Mutation(returns => TechSupport)
  async deleteAll_tech_support() {
    return this.TechSupportService.removePosts();
  }

  //=================TEST QUERIES================

  @Mutation(returns => TechSupport) //generate method as Query
  async add_tech_support() {
    return this.TechSupportService.addSomePost();
  }
}
