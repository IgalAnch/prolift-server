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
import { ContactUs } from './contact_us.entity';
import { ContactUsService } from './contact_us.service';

@Resolver(ContactUs)
export class ContactUsResolver {
  constructor(private contactUsService: ContactUsService) {}

  @Query(returns => ContactUs) //generate method as Query
  async contact_us(@Args('id', { type: () => Int }) id: number) {
    return this.contactUsService.findById(id);
  }

  //<<<<<<<>>>>>>>>>>>>DELETE ALL POSTS QUERY<<<<<<<<<<>>>>>>>>>> (remove later)
  @Mutation(returns => ContactUs)
  async removeAll_contact_us() {
    return this.contactUsService.removePosts();
  }
  @Mutation(returns => ContactUs)
  async deleteAll_contact_us() {
    return this.contactUsService.removePosts();
  } //

  //=================TEST QUERIES================

  @Mutation(returns => ContactUs) //generate method as Query
  async add_contact_us() {
    return this.contactUsService.addSomePost();
  }
}
