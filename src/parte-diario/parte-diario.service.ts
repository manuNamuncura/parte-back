import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateParteDiarioDto } from "./dto/create-parte-diario.dto";
import dayjs from "dayjs";
import { UpdateParteDiarioDto } from "./dto/update-parte-diario.dto";

@Injectable()
export class ParteDiarioService {
    constructor(private prisma: PrismaService) {}

    async create(createParteDiarioDto: CreateParteDiarioDto) {
        const obra = await this.prisma.obra.findUnique({
            where: { id: createParteDiarioDto.obraId },
        });

        if (!obra) {
            throw new NotFoundException(`Obra con ID ${createParteDiarioDto.obraId} no encontrada`);
        }

        const data = {
            ...createParteDiarioDto,
            fecha: createParteDiarioDto.fecha ? dayjs(createParteDiarioDto.fecha).toDate() : dayjs().toDate(),
        };

        return this.prisma.parteDiario.create({ data })
    }

    async findAllByObra(obraId: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.parteDiario.findMany({
                where: { obraId },
                skip,
                take: limit,
                orderBy: {
                    fecha: 'desc',
                },
            }),
            this.prisma.parteDiario.count({
                where: { obraId },
            }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPage: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const parteDiario = await this.prisma.parteDiario.findUnique({
            where: { id },
            include: {
                obra: true,
            },
        });

        if (!parteDiario) {
            throw new NotFoundException(`Parte diario con ID ${id} no encontrado`);
        }

        return parteDiario;
    }

    async update(id: string, updateParteDiarioDto: UpdateParteDiarioDto) {
        await this.findOne(id);

        const data: any = { ...updateParteDiarioDto };

        if (updateParteDiarioDto.fecha) {
            data.fecha = dayjs(updateParteDiarioDto.fecha).toDate();
        }

        if (updateParteDiarioDto.obraId) {
            const obra = await this.prisma.obra.findUnique({
                where: { id: updateParteDiarioDto.obraId },
            });

            if (!obra) {
                throw new NotFoundException(`Obra con ID ${updateParteDiarioDto.obraId} no encontrada`);
            }
        }

        return this.prisma.parteDiario.update({
            where: { id },
            data,
        })
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.parteDiario.delete({ where: { id }});
    }

    async getEstadisticas(obraId: string) {
        const partes = await this.prisma.parteDiario.findMany({
            where: { obraId },
        });

        const totalHoras = partes.reduce((sum, parte) => sum + parte.horas, 0);
        const partesPorEstado = {
            NORMAL: partes.filter(p => p.estado === 'NORMAL').length,
            RETRASO: partes.filter(p => p.estado === 'RETRASO').length,
            INCIDENTE: partes.filter(p => p.estado === 'INCIDENTE').length,
        }

        return {
            totalHoras,
            tptalPartes: partes.length,
            partesPorEstado,
        };
    }
}