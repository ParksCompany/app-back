const { MySqlConnection } = require("../database/mysql");

class EmissionsDatesRepository {
  getAllEmissionDates = async () => {
    try {
      const query = `SELECT id_emissions, roundTrip, date FROM emissionsApp.emissions_dates`;

      const [response] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar todas as datas das emissões`);
    }
  };

  getEmissionDatesById = async (emissionId) => {
    try {
      const query = `
        SELECT *
        FROM emissionsApp.emissions_dates
        where id_emissions = '${emissionId}'
      `;

      const [[response]] = await MySqlConnection.query(query);
      return response;
    } catch (err) {
      throw new Error(`Erro ao buscar as datas da emissão de ID ${emissionId}`);
    }
  };

  createEmissionDateByRoundTrip = async (emissionId, roundTrip, datesArray) => {
    try {
      for (let i = 0; i < datesArray.length; i++) {
        const query = `
          INSERT INTO emissionsApp.emissions_dates (id_emissions, roundTrip, date) 
          VALUES (${emissionId}, '${roundTrip}', '${datesArray[i]}');
        `;

        await MySqlConnection.query(query);
      }

      return { success: true, message: "Datas inseridas com sucesso!" };
    } catch (err) {
      throw new Error(`Erro ao criar as datas da emissão de id ${emissionId}.`);
    }
  };

  deleteEmissionDatesById = async (id, roundTrip) => {
    try {
      const query = `DELETE FROM emissionsApp.emissions_dates WHERE (id_emissions = '${id}' && roundTrip = '${roundTrip}');`;

      const response = await MySqlConnection.query(query);

      return response;
    } catch (err) {
      throw new Error(`Erro ao excluir as datas da emissão ${id}.`);
    }
  };
}

module.exports = { EmissionsDatesRepository };
