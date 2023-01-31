import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { CoreModule } from '../core/core.module';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [forwardRef(() => UserModule), CoreModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
