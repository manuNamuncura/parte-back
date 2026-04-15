import { Module } from "@nestjs/common";
import { ParteDiarioController } from "./parte-diario.controller";
import { ParteDiarioService } from "./parte-diario.service";

@Module({
    controllers: [ParteDiarioController],
    providers: [ParteDiarioService],
})
export class ParteDiarioModule {}