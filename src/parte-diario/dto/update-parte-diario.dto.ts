import { PartialType } from "@nestjs/mapped-types";
import { CreateParteDiarioDto } from "./create-parte-diario.dto";

export class UpdateParteDiarioDto extends PartialType(CreateParteDiarioDto) {}