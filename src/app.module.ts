import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/models/user.entity';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/entities/permission.enityt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'developer',
      password: 'secret',
      database: 'appdb',
      entities: [User, Role, Permission],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CoreModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
