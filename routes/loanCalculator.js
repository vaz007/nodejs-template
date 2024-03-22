const {Router} = require ('express');
const {amortization} = require ('../controller/loanCalculator');

const router = Router();

router
  .post('/calculate', amortization)
 
module.exports = router;