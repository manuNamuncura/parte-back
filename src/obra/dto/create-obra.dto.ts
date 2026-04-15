import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateObraDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @IsString()
    @IsNotEmpty({ message: 'El cliente es requerido' })
    cliente: string;

    @IsString()
    @IsNotEmpty({ message: 'La direccion es requerida' })
    direccion: string;

    @IsDateString()
    @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
    fechaInicio: string;

    @IsDateString()
    @IsNotEmpty({ message: 'La fecha de fin es requerida' })
    fechaFin?: string;
}