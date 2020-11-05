import {
  GET_TAX_HISTORY,
  GET_TAX_HISTORY_REPORT,
  GET_PA_SERVICES_TAX_REPORT,
  GET_PA_SERVICE_TAX_REPORT,
  GET_USER_DATA_QUERIES,
  GET_CUSTOM_PAYMENTS_LIST,
  GET_CUSTOM_TAX_CODES,
  GET_ALL_POPULATED_V3_STATES,
  GET_EXPERIENCE_RATES,
  GET_SAMPLE_DATE_FIELD_DATA,
  GET_SUPPLEMENTAL_INFO_FOR_TAX,
  GET_RECENT_USAGE,
  GET_CUSTOM_FORMULAS,
  GET_WORKSITES,
  GET_WORKSITES_LOCATIONS,
  GET_COMPANIES,
  GET_CUSTOM_TAX_FORMULAS,
  GET_CUSTOM_TAX_FORMULA,
  // Async field APIs
  GET_ALL_TAXCODES_AUTOCOMPLETE,
  GET_ALL_TAXTYPES_AUTOCOMPLETE,
  GET_PAYMENT_AUTOCOMPLETE_MOCKDATA,
  GET_ALL_AUTHORITY_CODE_AUTOCOMPLETE,
  GET_EXEMPT_MILITARY_LOCATION_AUTOCOMPLETE_MOCKDATA,
  GET_PRINCIPAL_STATE_EMPLOYMENT_AUTOCOMPLETE_MOCKDATA,
  GET_PLACE_CODE_AUTOCOMPLETE,
  GET_SCHOOL_DISTRICT_AUTOCOMPLETE,
  GET_GARNISMENT_FORMULA_AUTOCOMPLETE,
  GET_GARNISMENT_GROUP_CODE_AUTOCOMPLETE,
  GET_CUSTOM_GARNISMENT_FORMULA_AUTOCOMPLETE,
  GET_COUNTY_AUTOCOMPLETE,
  GET_GROUP_AUTOCOMPLETE,
  GET_USER_TAX_CODE_AUTOCOMPLETE_MOCKDATA,
  GET_GROUP_CODE_AUTOCOMPLETE,
  GET_TAX_CODE_UDQ_AUTOCOMPLETE_MOCKDATA,
  GET_CUSTOM_TYPEOF_DATA,
  GET_PAYMENT_CODE_AUTOCOMPLETE_MOCKDATA,
  GET_TAX_CODE_RECIPROCATE_AUTOCOMPLETE_MOCKDATA,
  GET_TAX_CODE_OVERRIDDEN_AUTOCOMPLETE_MOCKDATA,
  GET_NON_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA,
  GET_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA,
  GET_CALCULATION_METHOD_AUTOCOMPLETE_MOCKDATA,
  GET_WAGE_REPORTING_METHOD_AUTOCOMPLETE_MOCKDATA,
  GET_RESIDENT_STATE_AUTOCOMPLETE_MOCKDATA,
  GET_CUSTOM_GARNISMENT_CODE_AUTOCOMPLETE,
  DELTE_CUSTOM_PAYMENT,
  DELETE_CUSTOM_TAX_CODES,
  SAVE_CUSTOM_PAYMENT,
  SAVE_CUSTOM_TAX_CODES,
  SAVE_CUSTOM_FORMULAS,
  SAVE_WORKSITES_LOCATIONS,
  SAVE_WORKSITES,
  GET_CUSTOM_TAXCODES_AUTOCOMPLETE,
  GET_TYPEOF_DATA,
  GET_UDQ_AUTOCOMPLETE,
  SAVE_COMPANY,
  DELETE_COMPANY,
  GET_CUSTOM_GARNISHMENT_CODES,
  SAVE_CUSTOM_GARNISHMENT_CODE,
  DELETE_CUSTOM_GARNISHMENT_CODE,
  GET_EMPLOYEE_GROUPS,
  SAVE_EMPLOYEE_GROUP,
  DELETE_EMPLOYEE_GROUP,
  GET_GARNISHMENT_GROUPS,
  DELETE_GARNISHMENT_GROUP,
  SAVE_GARNISHMENT_GROUP,
  SAVE_CUSTOM_FORMULA,
  DELETE_CUSTOM_FORMULA,
  GENERATE_MARITAL_REPORT,
  GET_TAX_EFFECTIVE_DATE_OVERRIDES,
  DELETE_TAX_EFFECTIVE_DATE_OVERRIDE,
  SAVE_TAX_EFFECTIVE_DATE_OVERRIDE,
  GENERATE_BATCH_TEST_REPORT,
  GET_CUSTOM_GARNISMENT_FORMULAS,
  DELETE_WORKSITES_LOCATIONS,
  SAVE_SUPPRESS_MESSAGES,
  GET_SUPPRESSED_MESSAGES,
  GARNISHMENT_FORMULAS_OVERRIDE,
  GARNISHMENT_FORMULA_OVERRIDES,
  GET_DATASETS,
  GET_PERMISSIONS,
  SAVE_PERMISSIONS,
  PERMISSION_FOR,
  CUSTOM_GARNISHMENT_FORMULA,
  GARNISHMENT,
  AUTHORITY_NAME,
  GET_MESSAGE_VIEWER,
  GET_MESSAGES_VIEWER,
  GET_MESSAGES_VIEWER_TYPE,
  GET_MESSAGES_RUN_LIST_BY_DATE,
  DELETE_ALL_MESSAGES,
  DELETE_ALL_MESSAGES_BY_RUN_ID,
  GET_TAXTYPES_AUTOCOMPLETE,
  GET_TAXCODES_AUTOCOMPLETE,
  GET_TAXTYPES
} from './ServiceUrls';

export const metaDataApiMap = {
  bSITaxes: GET_USER_DATA_QUERIES,
  customOverridesForAuthority: GET_USER_DATA_QUERIES,
  populatedV3States: GET_ALL_POPULATED_V3_STATES,
  bSITaxes: GET_USER_DATA_QUERIES,
  companies: GET_USER_DATA_QUERIES,
  customGarnishmentFormula: GET_CUSTOM_GARNISMENT_FORMULAS,
  customGarnishments: GET_USER_DATA_QUERIES,
  customOverridesForAuthority: GET_USER_DATA_QUERIES,
  customTaxabilityForAuthority: GET_USER_DATA_QUERIES,
  customTaxes: GET_USER_DATA_QUERIES,
  disposableOverrides: GET_USER_DATA_QUERIES,
  employeeGroups: GET_USER_DATA_QUERIES,
  garnishmentDisposableWages: GET_USER_DATA_QUERIES,
  garnishmentFormulaOverride: GET_USER_DATA_QUERIES,
  garnishmentGroups: GET_USER_DATA_QUERIES,
  garnishmentParameters: GET_USER_DATA_QUERIES,
  garnishmentRequiringFilingStatus: GET_USER_DATA_QUERIES,
  maritalStatus: GET_USER_DATA_QUERIES,
  minimumAgeTaxes: GET_USER_DATA_QUERIES,
  monthlyQuarterlyTaxType: GET_USER_DATA_QUERIES,
  orderedPercentGarnishments: GET_USER_DATA_QUERIES,
  residentWorkValidation: GET_USER_DATA_QUERIES,
  supplementalMethods: GET_USER_DATA_QUERIES,
  taxabilityForAuthority: GET_USER_DATA_QUERIES,
  taxAuthorities: GET_USER_DATA_QUERIES,
  taxTypes: GET_USER_DATA_QUERIES,
  unemployment: GET_USER_DATA_QUERIES,
  validTaxFormulas: GET_USER_DATA_QUERIES,
  wageLimitsByAuthorityAndTaxType: GET_USER_DATA_QUERIES,
  allMappedPayCodes: GET_USER_DATA_QUERIES,
  allMappedTaxCodes: GET_USER_DATA_QUERIES,
  allMappedTaxCodesWithCounty: GET_USER_DATA_QUERIES,
  allMappedTaxTypes: GET_USER_DATA_QUERIES,
  statementOfExemptionAuthorities: GET_USER_DATA_QUERIES,
  customPayments: GET_CUSTOM_PAYMENTS_LIST,
  customTaxCodes: GET_CUSTOM_TAX_CODES,
  allBSIPlans: GET_USER_DATA_QUERIES,
  experienceRates: GET_EXPERIENCE_RATES,
  sampleDateFields: GET_SAMPLE_DATE_FIELD_DATA,
  supplementalMethods: GET_SUPPLEMENTAL_INFO_FOR_TAX,
  recentUsage: GET_RECENT_USAGE,
  customFormulas: GET_CUSTOM_FORMULAS,
  worksites: GET_WORKSITES,
  worksiteCompanies: GET_WORKSITES_LOCATIONS,
  companies: GET_USER_DATA_QUERIES,
  customTaxFormulas: GET_CUSTOM_TAX_FORMULAS,
  selectSamplePage: GET_CUSTOM_TAX_FORMULA,
  // TODO: Update below Urls after get the actual Urls
  employeeGroup: GET_EMPLOYEE_GROUPS,
  garnishmentGroup: GET_GARNISHMENT_GROUPS,
  addressOverrides: GET_CUSTOM_TAX_CODES,
  customGarnishment: GET_CUSTOM_GARNISHMENT_CODES,
  taxEffectiveDateOverrides: GET_TAX_EFFECTIVE_DATE_OVERRIDES,
  auditLogViewer: GET_CUSTOM_TAX_CODES,
  logins: GET_CUSTOM_TAX_CODES,
  company: GET_COMPANIES,
  unemploymentOverrides: GET_CUSTOM_FORMULAS,
  unemploymentCompanyOverrides: GET_CUSTOM_TAX_FORMULAS,
  optionalRateOverrides: GET_CUSTOM_FORMULAS,
  optionalRateOverride: GET_CUSTOM_TAX_FORMULAS,
  customNexusData: GET_CUSTOM_FORMULAS,
  customNexusCompanyData: GET_CUSTOM_TAX_FORMULAS,
  disposableRateOverrides: GET_CUSTOM_FORMULAS,
  disposableOverride: GET_CUSTOM_TAX_FORMULAS,
  customGarnishmentFormulas: GET_CUSTOM_FORMULAS,
  customGarnishmentTaxFormulas: GET_CUSTOM_TAX_FORMULAS,
  customPaymentExceptions: GET_CUSTOM_FORMULAS,
  customPaymentTaxExceptions: GET_CUSTOM_TAX_FORMULAS,
  customTaxPaymentOverrides: GET_CUSTOM_FORMULAS,
  customTaxPaymentOverride: GET_CUSTOM_TAX_FORMULAS,
  paymentOverrides: GET_CUSTOM_FORMULAS,
  paymentOverride: GET_CUSTOM_TAX_FORMULAS,
  reciprocalOverrides: GET_CUSTOM_FORMULAS,
  reciprocalOverride: GET_CUSTOM_TAX_FORMULAS,
  viewDisposableOverride: GET_CUSTOM_TAX_FORMULAS,
  messageViewer: GET_MESSAGE_VIEWER,
  messagesViewer: GET_MESSAGES_VIEWER,
  messageViewListByMessageType: GET_MESSAGES_VIEWER_TYPE,
  getMessageRunListByFilterDate: GET_MESSAGES_RUN_LIST_BY_DATE,
  paServicesTaxReport: GET_PA_SERVICES_TAX_REPORT,
  paServiceTaxReport: GET_PA_SERVICE_TAX_REPORT,
  // Mapping Tools
  mappingTools: GET_CUSTOM_TAX_FORMULAS,
  mapPaymentCodes: GET_CUSTOM_TAX_FORMULAS,
  mapPaymentCode: GET_CUSTOM_TAX_FORMULAS,
  mapTaxCodes: GET_CUSTOM_TAX_FORMULAS,
  mapTaxCode: GET_CUSTOM_TAX_FORMULAS,
  mapTaxTypes: GET_CUSTOM_TAX_FORMULAS,
  mapTaxType: GET_CUSTOM_TAX_FORMULAS,
  taxCodeUsage: GET_CUSTOM_TAX_FORMULAS,
  taxTypeUsage: GET_CUSTOM_TAX_FORMULAS,
  paymentCodeUsage: GET_CUSTOM_TAX_FORMULAS,
  taxHistory: GET_TAX_HISTORY,
  taxHistoryReport: GET_TAX_HISTORY_REPORT,
  messageToSuppress: GET_SUPPRESSED_MESSAGES,
  // Garnishnishment Formula Override
  garnishmentFormulasOverride: GARNISHMENT_FORMULAS_OVERRIDE,
  garnishmentFormulaOverrides: GARNISHMENT_FORMULA_OVERRIDES,
  garnishmentFormulaOverrideDetails: GET_USER_DATA_QUERIES,
  dataSets: GET_DATASETS,
  permissions: GET_PERMISSIONS,
  selectSamplePage: GET_SAMPLE_DATE_FIELD_DATA
};

export const deleteDataApiMap = {
  customPayments: DELTE_CUSTOM_PAYMENT,
  customTaxCodes: DELETE_CUSTOM_TAX_CODES,
  addressOverrides: DELTE_CUSTOM_PAYMENT,
  taxEffectiveDateOverrides: DELETE_TAX_EFFECTIVE_DATE_OVERRIDE,
  customTaxPaymentOverride: DELTE_CUSTOM_PAYMENT,
  messageViewer: DELETE_ALL_MESSAGES,
  messagesViewer: DELETE_ALL_MESSAGES_BY_RUN_ID,
  auditLogViewer: DELTE_CUSTOM_PAYMENT,
  company: DELETE_COMPANY,
  customGarnishment: DELETE_CUSTOM_GARNISHMENT_CODE,
  employeeGroup: DELETE_EMPLOYEE_GROUP,
  garnishmentGroup: DELETE_GARNISHMENT_GROUP,
  customTaxFormulas: DELETE_CUSTOM_FORMULA,
  customFormulas: DELETE_CUSTOM_FORMULA,
  worksiteCompanies: DELETE_WORKSITES_LOCATIONS
};

export const saveDataApiMap = {
  customPayments: SAVE_CUSTOM_PAYMENT,
  customTaxCodes: SAVE_CUSTOM_TAX_CODES,
  addressOverrides: SAVE_CUSTOM_PAYMENT,
  customFormulas: SAVE_CUSTOM_FORMULA,
  worksites: SAVE_WORKSITES,
  worksiteCompanies: SAVE_WORKSITES_LOCATIONS,
  customTaxFormulas: SAVE_CUSTOM_FORMULA,
  optionalRateOverride: SAVE_CUSTOM_FORMULAS,
  unemploymentOverrides: SAVE_CUSTOM_FORMULAS,
  taxEffectiveDateOverrides: SAVE_TAX_EFFECTIVE_DATE_OVERRIDE,
  customTaxPaymentOverride: SAVE_CUSTOM_FORMULAS,
  company: SAVE_COMPANY,
  customGarnishment: SAVE_CUSTOM_GARNISHMENT_CODE,
  employeeGroup: SAVE_EMPLOYEE_GROUP,
  garnishmentGroup: SAVE_GARNISHMENT_GROUP,
  messageToSuppress: SAVE_SUPPRESS_MESSAGES,
  permissions: SAVE_PERMISSIONS
};

export const generateApiMap = {
  maritalStatusReport: GENERATE_MARITAL_REPORT,
  batchTest: GENERATE_BATCH_TEST_REPORT
};

export const autoCompleteApiMap = {
  wageReportingMethod: GET_WAGE_REPORTING_METHOD_AUTOCOMPLETE_MOCKDATA,
  calculationMethod: GET_CALCULATION_METHOD_AUTOCOMPLETE_MOCKDATA,
  nonResidenceTaxType: GET_NON_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA,
  residenceTaxType: GET_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA,
  taxCodeReciprocate: GET_TAX_CODE_RECIPROCATE_AUTOCOMPLETE_MOCKDATA,
  userTaxCode: GET_USER_TAX_CODE_AUTOCOMPLETE_MOCKDATA,
  taxability: GET_TAXCODES_AUTOCOMPLETE,
  taxType: GET_ALL_TAXTYPES_AUTOCOMPLETE,
  taxTypeALL:GET_TAXTYPES_AUTOCOMPLETE,
  taxTypes:GET_TAXTYPES,
  garnishParamTaxType: GET_UDQ_AUTOCOMPLETE,
  companyCode: GET_UDQ_AUTOCOMPLETE,
  riskClass: GET_UDQ_AUTOCOMPLETE,
  taxCode: GET_ALL_TAXCODES_AUTOCOMPLETE,
  authorityCode: GET_ALL_AUTHORITY_CODE_AUTOCOMPLETE,
  authorityCodeList: GET_ALL_AUTHORITY_CODE_AUTOCOMPLETE,
  authorityCodegdw: GET_UDQ_AUTOCOMPLETE,
  authorityCodegp:GET_UDQ_AUTOCOMPLETE,
  authorityCodeNoall:GET_UDQ_AUTOCOMPLETE,
  placeCode: GET_PLACE_CODE_AUTOCOMPLETE,
  schoolDistrict: GET_SCHOOL_DISTRICT_AUTOCOMPLETE,
  garnishmentFormula: GET_GARNISMENT_FORMULA_AUTOCOMPLETE,
  garnishmentGroupCode: GET_UDQ_AUTOCOMPLETE,
  customTaxName: GET_CUSTOM_GARNISMENT_FORMULA_AUTOCOMPLETE,
  customGarnishmentCode: GET_CUSTOM_GARNISMENT_CODE_AUTOCOMPLETE,
  county: GET_COUNTY_AUTOCOMPLETE,
  groupAsync: GET_GROUP_AUTOCOMPLETE,
  groupCode: GET_UDQ_AUTOCOMPLETE,
  garnishmentGroup: GET_UDQ_AUTOCOMPLETE,
  taxCodeUdq: GET_TAX_CODE_UDQ_AUTOCOMPLETE_MOCKDATA,
  typeOfData: GET_TYPEOF_DATA,
  userTax: GET_UDQ_AUTOCOMPLETE,
  paymentCode: GET_PAYMENT_CODE_AUTOCOMPLETE_MOCKDATA,
  taxCodeOverridden: GET_TAX_CODE_OVERRIDDEN_AUTOCOMPLETE_MOCKDATA,
  formula: GET_UDQ_AUTOCOMPLETE,
  residentState: GET_RESIDENT_STATE_AUTOCOMPLETE_MOCKDATA,
  exemptMilitaryLocation: GET_EXEMPT_MILITARY_LOCATION_AUTOCOMPLETE_MOCKDATA,
  principalStateEmployment: GET_PRINCIPAL_STATE_EMPLOYMENT_AUTOCOMPLETE_MOCKDATA,
  payment: GET_PAYMENT_AUTOCOMPLETE_MOCKDATA,
  customTaxCode: GET_CUSTOM_TAXCODES_AUTOCOMPLETE,
  customTypeOfData: GET_CUSTOM_TYPEOF_DATA,
  employeeGroupCode: GET_UDQ_AUTOCOMPLETE,
  bsiAuth: GET_UDQ_AUTOCOMPLETE,
  permissionFor: PERMISSION_FOR,
  customGarnishmentFormula: CUSTOM_GARNISHMENT_FORMULA,
  garnishment: GARNISHMENT,
  authorityName: AUTHORITY_NAME
};