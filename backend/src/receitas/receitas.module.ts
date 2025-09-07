import { Module } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { ReceitasController } from './receitas.controller';

@Module({
  providers: [ReceitasService],
  controllers: [ReceitasController]
})
export class ReceitasModule {}
