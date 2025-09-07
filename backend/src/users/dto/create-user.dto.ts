// src/users/dto/create-user.dto.ts
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'O e-mail do usuário.' })
  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  email: string;

  @ApiProperty({ description: 'A senha do usuário. Deve ter pelo menos 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;
}