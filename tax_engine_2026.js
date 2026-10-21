/**
 * CorpTaxIQ — 2026 US 50-State LLC vs. S-Corp Statutory Tax Engine
 * Official Interactive Web App: https://blacklink.in/
 * Full Mathematical Specification: https://blacklink.in/methodology
 * 50-State Comparison Matrix: https://blacklink.in/50-state-matrix
 */

export const IRS_2026_CONSTANTS = {
  socialSecurityWageCap: 184500, // 2026 OASDI cap per IRS Topic No. 751
  socialSecurityRate: 0.124,
  medicareRate: 0.029,
  additionalMedicareRate: 0.009,
  additionalMedicareThresholdSingle: 200000,
  additionalMedicareThresholdMarried: 250000,
  standardDeductionSingle: 16100, // 2026 Standard Deduction (Single)
  standardDeductionMarried: 32200, // 2026 Standard Deduction (Married Jointly)
  solo401kElectiveDeferralCap: 24500, // IRC Section 402(g)
  solo401kTotalAdditionsCap: 72000, // IRC Section 415(c)(1)(A)
  qbiDeductionRate: 0.20 // IRC Section 199A
};

export function computeSelfEmploymentTax2026(netProfit, filingStatus = "single") {
  const seBase = netProfit * 0.9235;
  const ssTax = Math.min(seBase, IRS_2026_CONSTANTS.socialSecurityWageCap) * IRS_2026_CONSTANTS.socialSecurityRate;
  const medicareTax = seBase * IRS_2026_CONSTANTS.medicareRate;
  const addlThreshold = filingStatus === "married"
    ? IRS_2026_CONSTANTS.additionalMedicareThresholdMarried
    : IRS_2026_CONSTANTS.additionalMedicareThresholdSingle;
  const addlMedicare = Math.max(0, seBase - addlThreshold) * IRS_2026_CONSTANTS.additionalMedicareRate;
  return Math.round(ssTax + medicareTax + addlMedicare);
}

export function computeW2FicaTax2026(w2Salary, filingStatus = "single") {
  const ssTax = Math.min(w2Salary, IRS_2026_CONSTANTS.socialSecurityWageCap) * IRS_2026_CONSTANTS.socialSecurityRate;
  const medicareTax = w2Salary * IRS_2026_CONSTANTS.medicareRate;
  const addlThreshold = filingStatus === "married"
    ? IRS_2026_CONSTANTS.additionalMedicareThresholdMarried
    : IRS_2026_CONSTANTS.additionalMedicareThresholdSingle;
  const addlMedicare = Math.max(0, w2Salary - addlThreshold) * IRS_2026_CONSTANTS.additionalMedicareRate;
  return Math.round(ssTax + medicareTax + addlMedicare);
}
