function pdfAmount(req,res) {
    // 
    if (req?.plan < 0) {
        return 3;
    }
    const range = pdfPerPlanIncreament;
    for (let i = 1; i <= Number(NUMBER_OF_PLANS); i++) {
        if (req.plan == i) {
            return range;
        }
        range = range + pdfPerPlanIncreament;
    }
}

export default pdfAmount