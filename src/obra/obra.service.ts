import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateObraDto } from "./dto/create-obra.dto";
import dayjs from "dayjs";
import { UpdateObraDto } from "./dto/update-obra.dto";

@Injectable()
export class ObraService {
    constructor(private prisma: PrismaService) {}

    async create(createObraDto: CreateObraDto) {
        const data = {
            ...createObraDto,
            fechaInicio: dayjs(createObraDto.fechaInicio).toDate(),
            fechaFin: createObraDto.fechaFin ? dayjs(createObraDto.fechaFin).toDate() : null,
        };

        return this.prisma.obra.create({ data })
    }

    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.obra.findMany({
                skip,
                take: limit,
                include: {
                    partes: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.obra.count(),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const obra = await this.prisma.obra.findUnique({
            where: { id },
            include: {
                partes: {
                    orderBy: {
                        fecha: 'desc',
                    },
                },
            },
        });

        if (!obra) {
            throw new NotFoundException(`Obra con ID ${id} no encontrada`);
        }

        return obra;
    }

    async update(id: string, updateObraDto: UpdateObraDto) {
        await this.findOne(id);

        const data: any = { ...updateObraDto };

        if (updateObraDto.fechaInicio) {
            data.fechaInicio = dayjs(updateObraDto.fechaInicio).toDate();
        }

        if (updateObraDto.fechaFin !== undefined) {
            data.fechaFin = updateObraDto.fechaFin ? dayjs(updateObraDto.fechaFin).toDate() : null;
        }

        return this.prisma.obra.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.obra.delete({ where: { id }});
    }
}