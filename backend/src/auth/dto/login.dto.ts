import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'O e-mail do usuário para login.' })
  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  email: string;

  @ApiProperty({ description: 'A senha do usuário.' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;
}