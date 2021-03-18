import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'; //nest
import { AuthGuard } from '@nestjs/passport'; //nest

import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

//good practice
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

//console.log('========== 1 =========');
//console.log(context);
// console.log('========== 2 =========');
// console.log(ctx.getContext().req);
//console.log('========== 3 =========');
//console.log(ctx);
// console.log('========== 4 =========');
// console.log(ctx.getContext().req.body.variables);
// console.log('========== 5 =========');
// console.log(ctx.getContext().req);
