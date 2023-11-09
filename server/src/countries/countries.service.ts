import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateCountryDto } from "./dto/update-country.dto";

import { CountriesRepository } from "./countries.repository";
import { Country } from "./schemas/country.schema";

@Injectable()
export class CountriesService {
    constructor(private readonly countriesRepository: CountriesRepository) {}

    async getCountryById(countryId: string): Promise<Country> {
        return this.countriesRepository.findOne({ countryId })
    }

    async getCountries(): Promise<Country[]> {
        return this.countriesRepository.find({});
    }

    async createCountry(name: string): Promise<Country> {
        return this.countriesRepository.create({
            countryId: uuidv4(),
            name,
        })
    }

    async updateCountry(countryId: string, countryUpdates: UpdateCountryDto): Promise<Country> {
        return this.countriesRepository.findOneAndUpdate({ countryId }, countryUpdates);
    }

    async deleteCountry(countryId: string): Promise<Country> {
        return this.countriesRepository.delete({ countryId });
    }
}