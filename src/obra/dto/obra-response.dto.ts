import { Expose, Transform } from "class-transformer";

export class ObraResponseDto {
    @Expose()
    id: string;

    @Expose()
    nombre: string;

    @Expose()
    direccion: string;

    @Expose()
    @Transform(({ value }) => value.toISOString().split('T')[0])
    fechaInicio: Date;

    @Expose()
    @Transform(({ value }) => value ? value.toISOString().split('T')[0] : null)
    fechaFin: Date | null;

    @Expose()
    @Transform(({ value }) => value.toISOString().split('T')[0])
    createdAt: Date;

    @Expose()
    @Transform(({ value }) => value.toISOString().split('T')[0])
    updatedAt: Date;
}