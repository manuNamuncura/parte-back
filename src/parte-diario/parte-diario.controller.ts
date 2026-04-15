import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ParteDiarioService } from "./parte-diario.service";
import { CreateParteDiarioDto } from "./dto/create-parte-diario.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateParteDiarioDto } from "./dto/update-parte-diario.dto";

@Controller('partes-diario')
@UsePipes(new ValidationPipe({ transform: true }))
export class ParteDiarioController {
    constructor(private readonly parteDiarioService: ParteDiarioService) {}

    @Post()
    create(@Body() createParteDiarioDto: CreateParteDiarioDto) {
        return this.parteDiarioService.create(createParteDiarioDto);
    }

    @Get('obra/:obraId')
    findAllByObra(
        @Param('obraId') obraId: string,
        @Query() paginationDto: PaginationDto,
    ) {
        return this.parteDiarioService.findAllByObra(
            obraId,
            paginationDto.page,
            paginationDto.limit,
        );
    }

    @Get('obra/:obraId/estadisticas')
    getEstadisticas(@Param('obraId') obraId: string) {
        return this.parteDiarioService.getEstadisticas(obraId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.parteDiarioService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateParteDiarioDto: UpdateParteDiarioDto) {
        return this.parteDiarioService.update(id, updateParteDiarioDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.parteDiarioService.remove(id);
    }
}