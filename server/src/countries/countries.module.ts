import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CountriesController } from "./countries.controller";
import { CountriesRepository } from "./countries.repository";
import { CountriesService } from "./countries.service";
import { Country, CountrySchema } from "./schemas/country.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])],
    controllers: [CountriesController],
    providers: [CountriesService, CountriesRepository]
})
export class CountriesModule {}