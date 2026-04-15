import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ObraService } from "./obra.service";
import { CreateObraDto } from "./dto/create-obra.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateObraDto } from "./dto/update-obra.dto";

@Controller('obras')
@UsePipes(new ValidationPipe({ transform: true }))
export class ObraController {
    constructor(private readonly obraService: ObraService) {}

    @Post()
    create(@Body() createObraDto: CreateObraDto) {
        return this.obraService.create(createObraDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.obraService.findAll(paginationDto.page, paginationDto.limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.obraService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateObraDto: UpdateObraDto) {
        return this.obraService.update(id, updateObraDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.obraService.remove(id);
    }
}