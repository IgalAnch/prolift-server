import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechSupportResolver } from './tech_support.resolver';
import { TechSupportService } from './tech_support.service';
import { TechSupport } from './tech_support.entity';



@Module({
  imports:[TypeOrmModule.forFeature([TechSupport]),],
   providers:[TechSupportService, TechSupportResolver],
    exports:[TechSupportService]
})


export class TechSupportModule{

}