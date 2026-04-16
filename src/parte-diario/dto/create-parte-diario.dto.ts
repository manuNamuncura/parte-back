import { Type } from "class-transformer";
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateParteDiarioDto {
    @IsOptional()
    @IsDateString()
    fecha?: string;

    @IsString()
    @IsNotEmpty({ message: 'La descripción es requerida' })
    descripcion: string;

    @Type(() => Number)
    @IsInt({ message: 'Las horas deben ser un numero entero' })
    @Min(1, { message: 'Las horas deben ser al menos 1' })
    @Max(24, { message: 'Las horas no pueden exceder 24' })
    horas: number;

    @IsString()
    @IsIn(['NORMAL', 'RETRASADO', 'INCIDENTE', 'FINALIZADO'], {
        message: 'El estado debe ser NORMAL, RETRASADO, INCIDENTE o FINALIZADO',
    })
    estado: string;

    @IsString()
    @IsNotEmpty({ message: 'El ID de la obra es requerido' })
    obraId: string;
}