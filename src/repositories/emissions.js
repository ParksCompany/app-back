const { MySqlConnection } = require("../database/mysql");
const { formatArrayToSqlWhere } = require("../helpers/utils");

class EmissionsRepository {
  getEmissionById = async (id) => {
    try {
      const query = `
        SELECT * FROM emissionsApp.emissions
        WHERE id_emissions like '${id}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar a emissão de Id ${id}`);
    }
  };

  getAllEmissions = async (premium, departureCitiesId, destinyCitiesId, airlineName, airlineProgram) => {
    try {
      const query = `
        SELECT 
          EM.*, 
            CIT.name as departureCity, 
            CIT2.name as destinyCity 
        FROM emissionsApp.emissions EM
        LEFT JOIN emissionsApp.cities CIT ON EM.departureCityId = CIT.id_cities
        LEFT JOIN emissionsApp.cities CIT2 ON EM.destinyCityId = CIT2.id_cities
        WHERE EM.destinyCityId IS NOT NULL
        ${premium !== null ? `AND EM.premiumEmission = ${premium === true ? 1 : 0}` : ""}
        ${departureCitiesId ? `AND EM.departureCityId IN (${departureCitiesId})` : ""}
        ${destinyCitiesId ? `AND EM.destinyCityId IN (${destinyCitiesId})` : ""}
        ${airlineName ? `AND EM.airlineName IN (${formatArrayToSqlWhere(airlineName)})` : ""}
        ${airlineProgram ? `AND EM.airlineProgram IN (${formatArrayToSqlWhere(airlineProgram)})` : ""}
        ORDER BY EM.created_at desc;
      `;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar as cidades`);
    }
  };

  createEmission = async (emissionData) => {
    try {
      // Lista dos campos obrigatórios
      const requiredFields = [
        "premiumEmission",
        "departureCityId",
        "destinyCityId",
        "airlineName",
        "airlineProgram",
        "departureMilesPrice",
        "departureMoneyPrice",
        "returnMilesPrice",
        "returnMoneyPrice",
        "totalMilesPrice",
        "totalMoneyPrice",
        "moneyUrl",
        "milesUrl",
      ];

      // Verifica se algum campo obrigatório está ausente
      const missingFields = requiredFields.filter((field) => emissionData[field] === undefined || emissionData[field] === null || emissionData[field] === "");

      if (missingFields.length > 0) {
        throw new Error(`Os seguintes campos são obrigatórios e estão faltando: ${missingFields.join(", ")}`);
      }

      const {
        premiumEmission,
        departureCityId,
        destinyCityId,
        airlineName,
        airlineProgram,
        departureMilesPrice,
        departureMoneyPrice,
        returnMilesPrice,
        returnMoneyPrice,
        totalMilesPrice,
        totalMoneyPrice,
        moneyUrl,
        milesUrl,
        cityImageUrl,
        created_at,
      } = emissionData;

      const query = `
      INSERT INTO emissionsApp.emissions (
        premiumEmission, 
        departureCityId, 
        destinyCityId, 
        airlineName, 
        airlineProgram, 
        departureMilesPrice, 
        departureMoneyPrice, 
        returnMilesPrice, 
        returnMoneyPrice, 
        totalMilesPrice, 
        totalMoneyPrice, 
        moneyUrl, 
        milesUrl, 
        cityImageUrl, 
        created_at
      ) VALUES (
        '${premiumEmission}', 
        '${departureCityId}', 
        '${destinyCityId}', 
        '${airlineName}', 
        '${airlineProgram}', 
        '${departureMilesPrice}', 
        '${departureMoneyPrice}', 
        '${returnMilesPrice}', 
        '${returnMoneyPrice}', 
        '${totalMilesPrice}', 
        '${totalMoneyPrice}', 
        '${moneyUrl}', 
        '${milesUrl}', 
        '${cityImageUrl}', 
        '${created_at}'
      );
    `;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao criar a emissão`);
    }
  };

  updateEmission = async (id, updateData) => {
    try {
      if (!id) {
        throw new Error("ID da emissão é obrigatório para atualizar.");
      }

      //emission dates are updated in another section
      if (updateData.departureDates) delete updateData.departureDates;
      if (updateData.returnDates) delete updateData.returnDates;

      if (Object.keys(updateData).length === 0) return;

      // Filtra apenas os campos que o usuário enviou
      const fieldsToUpdate = Object.entries(updateData)
        .filter(([key, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key} = ${typeof value === "string" ? `'${value}'` : value}`)
        .join(", ");

      if (!fieldsToUpdate) {
        throw new Error("Nenhum campo válido foi enviado para atualização.");
      }

      const query = `UPDATE emissionsApp.emissions SET ${fieldsToUpdate} WHERE id_emissions = ${id}`;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao atualizar a emissão: ${err.message}`);
    }
  };

  deleteEmission = async (id) => {
    try {
      const query = `DELETE FROM emissionsApp.emissions WHERE (id_emissions = '${id}');`;

      const response = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao excluir a emissão de ID ${id}.`);
    }
  };
}

module.exports = { EmissionsRepository };
