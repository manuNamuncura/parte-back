import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ObraModule } from './obra/obra.module';
import { ParteDiarioModule } from './parte-diario/parte-diario.module';

@Module({
  imports: [PrismaModule, ObraModule, ParteDiarioModule],
})
export class AppModule {}
