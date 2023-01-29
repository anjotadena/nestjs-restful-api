import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [forwardRef(() => UserModule), CoreModule],
  controllers: [AuthController],
})
export class AuthModule {}
