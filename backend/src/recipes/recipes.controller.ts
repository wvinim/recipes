import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiTags, ApiQuery, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request } from 'express'; 

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cadastrar uma nova receita (requer autenticação)' })
  @ApiResponse({ status: 201, description: 'Receita criada com sucesso.' })
  async create(@Req() req: Request, @Body() createRecipeDto: CreateRecipeDto) {
    const userId = req.user!.userId;
    return this.recipesService.create(createRecipeDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as receitas (opcionalmente com busca)' })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Termo de busca para o título da receita.',
  })
  findAll(@Query('search') search?: string) {
    return this.recipesService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma receita pelo ID' })
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar uma receita pelo ID (requer autenticação)' })
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Excluir uma receita pelo ID (requer autenticação)' })
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}