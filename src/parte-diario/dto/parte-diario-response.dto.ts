import { Expose, Transform } from "class-transformer";

export class ParteDiarioResponseDto {
    @Expose()
    id: string;

    @Expose()
    @Transform(({ value }) => value.toISOString().split('T')[0])
    fecha: Date;

    @Expose()
    descripcion: string;

    @Expose()
    horas: number;

    @Expose()
    estado: string;

    @Expose()
    obraId: string;

    @Expose()
    @Transform(({ value }) => value.toISOString().split('T')[0])
    createdAt: Date;
}