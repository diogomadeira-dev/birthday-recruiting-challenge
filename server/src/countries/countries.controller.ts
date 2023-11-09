import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CountriesService } from './countries.service';
import { Country } from './schemas/country.schema';

@Controller('api/countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get(':countryId')
  async getCountry(@Param('countryId') countryId: string): Promise<Country> {
    return this.countriesService.getCountryById(countryId);
  }

  @Get()
  async getCountries(): Promise<Country[]> {
      return this.countriesService.getCountries();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCountry(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
      return this.countriesService.createCountry(createCountryDto.name)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':countryId')
  async updateCountry(@Param('countryId') countryId: string, @Body() updateCountryDto: UpdateCountryDto): Promise<Country> {
      return this.countriesService.updateCountry(countryId, updateCountryDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':countryId')
  async deleteCountry(@Param('countryId') countryId: string): Promise<Country> {
      return this.countriesService.deleteCountry(countryId);
  }
}