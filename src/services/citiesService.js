const { CitiesRepository } = require("../repositories/cities");

class CitiesService {
  getCitiesDataByListOfNames = async (cityNames) => {
    const citiesRepository = new CitiesRepository();

    const citiesData = await citiesRepository.getCitiesByNameArray(cityNames);

    // Extrair os nomes das cidades de citiesData
    const citiesDataNames = citiesData.map((city) => city.name);

    // Encontrar as cidades que estão em cityNames mas não em citiesDataNames
    const missingCities = cityNames.filter((city) => !citiesDataNames.includes(city));

    // Se houver cidades faltando, lançar um erro
    if (missingCities.length > 0) {
      throw new Error(
        `${missingCities.length === 1 ? "A cidade" : "As cidades"} ${missingCities.join(", ")} do seu filtro ${
          missingCities.length === 1 ? "não foi encontrada." : "não foram encontradas."
        }`
      );
    }

    return citiesData;
  };
}

module.exports = { CitiesService };
