

// const interestRates = {
//     "2012-01-01": 5,
//     "2013-02-01": 6,
//     "2014-03-01": 7,
//     "2015-04-01": 8,
//     "2016-02-01": 9,
//     "2017-05-01": 7,
//     "2018-06-01": 8.5,
//     "2019-01-01": 8.3
// };

// const staticInterestRates = {
//     "2012-01-01": 10,
//     "2013-02-01": 10,
//     "2014-03-01": 10,
//     "2015-04-01": 10,
//     "2016-02-01": 10,
//     "2017-05-01": 10,
//     "2018-06-01": 10,
//     "2019-01-01": 10
// };

function calculateLoan(principal, tenure, startDate, prepayments, interestRates) {
    let remainingPrincipal = principal;
    let totalInterest = 0;
    let result = {
        installments: [],
        totalInterest: 0,
        principal: principal,
        totalAmount: 0,
        durationMonths: tenure * 12
    };

    // Sort interest rates by date
    const sortedInterestRates = Object.entries(interestRates).sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));

    for (let i = 0; i < result.durationMonths; i++) {
        const currentDate = new Date(startDate.getTime());
        currentDate.setMonth(startDate.getMonth() + i);

        let currentRate = null;

        // Find the applicable interest rate for the current month
        for (const [date, rate] of sortedInterestRates) {
            if (new Date(date) <= currentDate) {
                currentRate = rate;
            } else {
                break;
            }
        }

        const monthlyInterestRate = currentRate / 12 / 100;

        // Check for prepayments in the current month
        let prepayment = prepayments[currentDate.toISOString().slice(0, 10)] || 0;
        
        // Deduct prepayment from the remaining principal
        remainingPrincipal -= prepayment;

        const monthlyPayment = (remainingPrincipal + prepayment) * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -result.durationMonths));

        const interest = remainingPrincipal * monthlyInterestRate; // Monthly interest
        totalInterest += interest;
        const principalPaid = monthlyPayment - interest;
        remainingPrincipal -= principalPaid;
        console.log("prepayment : ",remainingPrincipal)
       
        const percentage = (interest / (remainingPrincipal + interest)) * 100;

        result.installments.push({
            month: i + 1,
            date: currentDate.toLocaleDateString('en-GB'), // Rearrange date format to dd/mm/yyyy
            principalPaid: principalPaid.toFixed(2),
            interest: interest.toFixed(2),
            installment: (principalPaid + interest).toFixed(2),
            balance: (remainingPrincipal + interest).toFixed(2),
            percentage: percentage.toFixed(2) + "%",
            currentInterestRate: currentRate + "%"
        });
    }

    result.totalInterest = totalInterest.toFixed(2);
    result.totalAmount = (principal + totalInterest).toFixed(2);

    return result;
}


module.exports = {
    calculateLoan
}

// const principal = 100000; // Initial loan amount
// const tenure = 5; // Loan tenure in years
// const startDate = new Date("2012-01-01"); // Start date of the loan
// const prepayments = {
//     "2013-03-01": 5000
// };

// const loanDetails = calculateLoan(principal, tenure, startDate, prepayments);
// // console.log(loanDetails);

// console.log("Month\tDate\t\tPrincipal\tInterest\tInstallment\tBalance\t\t\tPercentage\tCurrent Interest Rate");
// loanDetails.installments.forEach(installment => {
//     console.log(`${installment.month}\t${installment.date}\t${installment.principalPaid}\t\t${installment.interest}\t\t${installment.installment }\t\t\t${installment.balance}\t\t${installment.percentage}\t\t${installment.currentInterestRate}`);
// });
// console.log("\nTotal Interest: $" + loanDetails.totalInterest);
// console.log("Principal: $" + loanDetails.principal);
// console.log("Total Amount Paid: $" + loanDetails.totalAmount);
// console.log("Duration (Months): " + loanDetails.durationMonths);
