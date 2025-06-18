import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class TransactionDto {
  @IsString()
  @IsNotEmpty()
  toAccount!: string;    // Número de cuenta destino

  @IsNumber()
  @Min(0.01)
  amount!: number;       // Monto de la transferencia, mínimo 0.01
}
