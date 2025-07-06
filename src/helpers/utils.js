const moment = require("moment");

function areAllDatesValid(dateArray) {
  return dateArray.every((dateStr) => moment(dateStr, "YYYY-MM-DD HH:mm", true).isValid());
}

const formatArrayToSqlWhere = (array, atribute = null) => {
  return array.map((item) => `'${atribute ? item[atribute] : item}'`).join(",");
};

const transformStringToArray = (string) => {
  if (!string || !string.trim()) return null;

  return string
    .split(",")
    .map((item) => item.trim()) // Remove espaços extras de cada item
    .filter((item) => item.length > 0); // Remove itens vazios caso existam
};

module.exports = { formatArrayToSqlWhere, transformStringToArray, areAllDatesValid };
