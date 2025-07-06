import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { RolePermissionModule } from './authentication/role-permission/role-permission.module';
import { PermissionModule } from './authentication/permission/permission.module';
import { RoleModule } from './authentication/role/role.module';
import { UserModule } from './user/user.module';
import { RedisConfigModule } from './redis/redis.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') ?? '5432', 10),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Only for development!
        entities: [__dirname + '/inventory/**/*.model.{ts,js}'],
      }),
    }),
    RedisConfigModule,
    CommonModule,
    InventoryModule,
    OrderModule,
    UserModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
