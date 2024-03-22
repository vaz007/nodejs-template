
const moment = require('moment');

const isValidDate = (dateString) => {
      // Parse the date string with the specified format
      const parsedDate = moment(dateString, "DD/MM/YYYY", true); // Strict parsing
  
      // Check if the parsing was successful (valid date)
      return parsedDate.isValid();
    
  }


  module.exports = {
    isValidDate
}
