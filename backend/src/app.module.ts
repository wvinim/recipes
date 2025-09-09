import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '..', '.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.ENVIRONMENT == 'docker' ? process.env.MYSQL_HOST : 'localhost',
      port: parseInt(process.env.MYSQL_TCP_PORT ?? '3306'),
      username: process.env.MYSQL_USER ?? 'root',
      password: process.env.MYSQL_PASSWORD ?? 'rootpassword',
      database: process.env.MYSQL_DATABASE ?? 'recipes_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RecipesModule,
  ],
})
export class AppModule {}
