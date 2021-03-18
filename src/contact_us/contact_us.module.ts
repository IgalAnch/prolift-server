import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactUsResolver } from './contact_us.resolver';
import { ContactUsService } from './contact_us.service';
import { ContactUs } from './contact_us.entity';



@Module({
  imports:[TypeOrmModule.forFeature([ContactUs]),],
   providers:[ContactUsService, ContactUsResolver],
    exports:[ContactUsService]
})


export class ContactUsModule{

}