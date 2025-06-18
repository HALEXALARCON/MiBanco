import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class TransferDto {
  @IsString()
  @IsNotEmpty({ message: 'El número de cuenta de destino es obligatorio' })
  toAccount!: string;    // Número de cuenta bancaria destino

  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0.01, { message: 'El monto mínimo es 0.01' })
  amount!: number;       // Monto a transferir
}
