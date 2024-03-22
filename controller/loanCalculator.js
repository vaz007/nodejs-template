const {isValidDate} = require('../middleware/validDate');
const interestRates = {
    "2012-01-01": 5,
    "2013-02-01": 6,
    "2014-03-01": 7,
    "2015-04-01": 8,
    "2016-02-01": 9,
    "2017-05-01": 7,
    "2018-06-01": 8.5,
    "2019-01-01": 8.3
};
 // Get interestRates through DB. Can save it locally in a variable through redis. Cause interest Rates don't fluctuate so much

    // const principal = 100000; // Initial loan amount
    // const tenure = 5; // Loan tenure in years
    // const startDate = new Date("2012-01-01"); // Start date of the loan
    // const prepayments = {
    //     "2013-03-01": 5000
    // };

const amortization = async (req, res) => {
    const {principal, tenure, startDate, prepayments} = req.body;

    if(principal || tenure || startDate) {
        return res.status(400).send({
            status : "failure",
            message: "INVALID_PARAMS",
            err : []
        })
    }
    if(!isValidDate(startDate)) {
        return res.status(400).send({
            status : "failure",
            message: "DATE_NOT_VALID",
            err : []
        })
    }
   
    const loanDetails = calculateLoan(principal, tenure, startDate, prepayments, interestRates);
    // console.log(loanDetails);

    console.log("Month\tDate\t\tPrincipal\tInterest\tInstallment\tBalance\t\t\tPercentage\tCurrent Interest Rate");
    loanDetails.installments.forEach(installment => {
        console.log(`${installment.month}\t${installment.date}\t${installment.principalPaid}\t\t${installment.interest}\t\t${installment.installment }\t\t\t${installment.balance}\t\t${installment.percentage}\t\t${installment.currentInterestRate}`);
    });
    console.log("\nTotal Interest: $" + loanDetails.totalInterest);
    console.log("Principal: $" + loanDetails.principal);
    console.log("Total Amount Paid: $" + loanDetails.totalAmount);
    console.log("Duration (Months): " + loanDetails.durationMonths);

}

module.exports = {
    amortization
}