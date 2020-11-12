import moment from 'moment'; 
import {
  metadatamap,
  tftools,
  deletedatamap,
  savedatamap,
  asyncselfldsmap,
  generateDataMap
} from "../constants/TFTools";
import mockDataMapper from "../../app/metadata/_mockDataMap";
import mockAutoCompleteMap from "../../app/metadata/_mockAutoCompleteMap";
import * as metaData from "../../app/metadata/_metaData";
import { generateUrl } from "bsiuilib";
import * as CellsRenderer from "../../app/metadata/cellsrenderer";
import store from "../../tf_reports";
/**
 * buildModuleAreaLinks
 * @param {*} apps
 */
export function buildModuleAreaLinks(apps) {
  let premTFtools = [];
  apps.forEach(function (app) {
    if (app.id == "73b9a516-c0ca-43c0-b0ae-190e08d77bcc") {
      app.accessIds.forEach(function (access) {
        if (access.id == "162ebe14-8d87-44e1-a786-c9365c9d5cd8" && access.visible == true) {
          premTFtools = tftools.filter(tftool => {
            if (app.permissions.hasOwnProperty(tftool.value) && tftool.link == true) return tftool;
          });
        }
      });
    }
  });
  return premTFtools;
}
/**
 * setPerms
 * @param {*} perm
 */
export function setPerms(perm) {
  let appperm = {
    VIEW: perm[0] == 1 ? true : false,
    SAVE: perm[1] == 1 ? true : false,
    DELETE: perm[2] == 1 ? true : false,
    RUN: perm[3] == 1 ? true : false,
    AUDIT: perm[4] == 1 ? true : false
  };
  return appperm;
}
/**
 * openHelp
 * @param {*} pageid
 */
export function openHelp(pageid) {
  window.open("/help/" + pageid, "_blank");
}
export function getMetaData(pageid) {
  return metaData[pageid];
}

export const cellbeginedit = (row, datafield) => {
  let _id = document.querySelector("div[role='grid']").id;
  const rowdata = $(`#${_id}`).jqxGrid("getrowdata", row);
  if (datafield === "audit") {
    return rowdata.isAuditable;
  }
  return true;
};

/**
 * compMetaData
 * @param {*} pageid
 */
export function compMetaData(pageid, key) {
  if (key !== undefined && metaData[pageid] instanceof Array && metaData[pageid][key]) {
    const { formFilterData } = store.getState();
    const metaDataCopy = JSON.parse(JSON.stringify(metaData[pageid][key])); // Copy medata
    let gridMetaData = checkForStaticRender(metaDataCopy);
    // for first table to have back button to parent we check for key === 0
    if (typeof gridMetaData.pgdef.parentConfig === "string") {
      gridMetaData.pgdef.parentConfig = metaData[gridMetaData.pgdef.parentConfig];
    }
    if (gridMetaData.pgdef.caption) {
      gridMetaData.pgdef.caption = setTemplateData(gridMetaData.pgdef.caption, formFilterData);
    }
    return gridMetaData;
  } else {
    if (metaData[pageid]) {
      let metadata = checkForStaticRender(metaData[pageid]);
      if (pageid === "permissions") {
        metadata.griddef.columns.forEach(column => {
          column.cellbeginedit = cellbeginedit;
        });
      }
      return metadata;
    }
    let metadataMap = metadatamap.find(metadatam => {
      if (pageid == metadatam.id) return metadatam;
    });
    let metadata = checkForStaticRender(metadataMap.metadata);

    return metadata;
  }
}

export const formatFieldData = (fieldData, pageId, userId) => {
  if (fieldData) {
    fieldData.forEach(field => {
      const state = store.getState();
      if (field.id === "permissionFor" && pageId === "permissions") {
        if (state.formData && state.formData.data && state.formData.data.permissionFor) {
          field.value = state.formData.data.permissionFor;
        } else {
          field.value = userId;
        }
      }

      if (field.value === "new Date()") {
        field.value = moment().format("MM/DD/yyyy");
      }

      // retain form values of date filter in the field values of messageViwer 
      // if ((field.id === "startdate" || field.id === "enddate") && pageId === "messageViewer"){
      //   if (state.formData && state.formData.data && state.formData.data[field.id]) {
      //     field.value = state.formData.data[field.id];
      //   }
      // }
    });
  }

  return fieldData;
};

export function decorateData(griddata, pageid) {
  if (pageid == "taxabilityForAuthority") {
    let state = store.getState();
    let filterData = state.formFilterData;
    console.log(state);
    griddata.forEach(function (value) {
      value.authorityCode = filterData.authorityCodeNoall;
    });
    return griddata;
  } else {
    return griddata;
  }
}
export function checkForStaticRender(metadata) {
  metadata.griddef.columns.forEach(function (value) {
    if (value.rendererStaticInput && CellsRenderer[value.rendererStaticInput]) {
      value.cellsrenderer = CellsRenderer[value.rendererStaticInput];
    }
  });
  return metadata;
}
/**
 * compPermissions
 * @param {*} pid
 */
export function compPermissions(pid) {
  let perms = getAllRights();
  if (perms.hasOwnProperty(pid)) {
    return setPerms(perms[pid]);
  }
}
/**
 * compURL
 * @param {*} pageid
 */
export function compURL(pageid) {
  let metadataMap = metadatamap.find(metadatam => {
    if (pageid == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(metadataMap.url);
  //return url;
  return dataURL(pageid);
}
/*export function compURL(pageid,...params) {
  let metadataMap = metadatamap.find(metadatam => {
    if (pageid == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(metadataMap.url);
  console.log('buildGetRecsUrl >>>');
  var arr = [];
  arr.push('VINIT'); 
  let dataset ='Vinit123'
  console.log(format(url,dataset));
  return url;
};*/

/**
 * dataURL
 */
function dataURL(pageid) {
  let gridDataUrl;
  switch (pageid) {
    case "allBSIPlans":
      gridDataUrl = "./ALL_BSI_PLANS_MOCKDATA.json";
      break;
    case "customPayments":
      gridDataUrl = "./CUSTOM_PAYMENTS_MOCKDATA.json";
      break;
    case "customTaxCodes":
      gridDataUrl = "./CUSTOM_TAX_PAYMENT_MOCKDATA.json";
      break;
    case "populateV3States":
      gridDataUrl = "./POPULATE_V3_STATES_MOCKDATA.json";
      break;
    case "experienceRates":
      gridDataUrl = "./EXPERIENCE_RATES_MOCKDATA.json";
      break;
    case "supplementalMethods":
      gridDataUrl = "./SUPPLEMENTAL_METHODS_MOCKDATA.json";
    case "customForumulas":
      gridDataUrl = "./CUSTOM_FORMULAS_MOCKDATA.json";
    case "worksites":
      gridDataUrl = "./COMPANIES_MOCKDATA.json";
    default:
      break;
  }
  return gridDataUrl;
}

/**
 * format
 * @param {*} fmt
 * @param  {...any} args
 */
export function format(fmt, ...args) {
  if (!fmt.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
    throw new Error("invalid format string.");
  }
  return fmt.replace(/((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g, (m, str, index) => {
    if (str) {
      return str.replace(/(?:{{)|(?:}})/g, m => m[0]);
    } else {
      if (index >= args.length) {
        throw new Error("argument index is out of range in format");
      }
      return args[index];
    }
  });
}
/**
 * buildGridDataInput
 * @param {*} pageid
 * @param {*} store
 */
export function buildGridDataInput(pageid, store) {
  let state = store.getState();
  let filterData = state.formFilterData;
  console.log(state);
  let stDate = getStartDate(filterData);
  let enDate = getEndDate(filterData);
  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    //companyCode: filterData.companyCode,
    companyCode: getCompanyCode(filterData),
    companyName: filterData.companyName,
    taxCode: getTaxCode(filterData),
    taxName: filterData.name,
    startdate: stDate,
    endDate: enDate,
    riskClass: filterData.riskClass,
    taxType: getTaxType(filterData),
    formNumber: getFormNum(filterData),
    courtesy: filterData.courtesy,
    authCode: getAuthCode(filterData),
    garnishmentGroupCode: filterData.garnishmentGroupCode,
    groupCode: getGroupcode(filterData),
    exemptStat: filterData.exemptionStatus,
    customTaxCode: filterData.customTaxCode === "ALL" ? "" : filterData.customTaxCode,
    pmtUsrCode: getPmtUsrCode(filterData),
    formula: filterData.formula,
    usrtax: filterData.userTax,
    runId: filterData.runid,
    messageType: filterData.messageType
  };
  return input;
}
export function buildMaritalStatusInput(pageid, store,formdata) {
  let state = store.getState();
  console.log(formdata);
  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    startdate:getFrmStartDate(formdata),
    allDates:(formdata.allDates && formdata.allDates===true) ? true:false
  };
  return input;
}
export function getTaxCode(filterData) {
  if (filterData && filterData.taxCode) {
    return filterData.taxCode;
  } else if (filterData && filterData.customTaxName) {
    return filterData.customTaxName;
  }else if (filterData && filterData.taxTypeALL) {
    return filterData.taxTypeALL;
  }else if (filterData && filterData.taxability) {
    return filterData.taxability;
  }
}
export function getAuthCode(filterData) {
  if (filterData && filterData.authorityCode) {
    return filterData.authorityCode;
  } else if (filterData && (filterData.bsiAuth || filterData.bsiauth)) {
    return filterData.bsiAuth || filterData.bsiauth;
  } else if (filterData && (filterData.authorityCodegdw)) {
    return filterData.authorityCodegdw;
  }else if (filterData && (filterData.authorityCodegp)) {
    return filterData.authorityCodegp;
  }else if (filterData && (filterData.authorityCodeNoall)) {
    return filterData.authorityCodeNoall;
  }
}
export function getFrmEndDate(filterData) {
  if (filterData && (filterData.startDate || filterData.startdate)) {
    let dt = filterData.endDate ? filterData.endDate : filterData.rescind;
    let newdt = "";
    if (dt.indexOf("/") > 0) {
      return dt;
    } else if (dt.indexOf("-") > 0) {
      let spldt = dt.split("-");
      let newdt = spldt[1] + "/" + spldt[2] + "/" + spldt[0];
      return newdt;
    }
  } else {
    return "";
  }
}
export function getEndDate(filterData) {
  if (filterData && filterData.includeAllDates) {
    return "ALL";
  } else if (filterData && (filterData.endDate || filterData.enddate)) {
    const date = filterData.endDate || filterData.enddate;
    let enDate = date;
    
    if( date.indexOf('-') !== -1){
        const dt = date.split("-");
        enDate = dt[1] + "/" + dt[2] + "/" + dt[0];
    }
     
    return enDate;
  } else {
    return "";
  }
}
export function getFrmEffDate(filterData) {
  if (filterData && filterData.effecDate) {
    let dt = filterData.effecDate;
    if (dt.indexOf("/") > 0) {
      return dt;
    } else if (dt.indexOf("-") > 0) {
      let spldt = dt.split("-");
      let newdt = spldt[1] + "/" + spldt[2] + "/" + spldt[0];
      return newdt;
    }
  } else {
    return "";
  }
}
export function getFrmStartDate(filterData) {
  if (filterData && (filterData.startDate || filterData.startdate)) {
    let dt = filterData.startDate ? filterData.startDate : filterData.startdate;
    let newdt = "";
    if (dt.indexOf("/") > 0) {
      return dt;
    } else if (dt.indexOf("-") > 0) {
      let spldt = dt.split("-");
      let newdt = spldt[1] + "/" + spldt[2] + "/" + spldt[0];
      return newdt;
    }
  } else {
    return "";
  }
}
export function getStartDate(filterData) {
  if (filterData && filterData.includeAllDates) {
    return "ALL";
  } else if (filterData && (filterData.startDate || filterData.startdate)) {
    const date = filterData.startDate || filterData.startdate;
    let stDate = date;
    
    if( date.indexOf('-') !== -1){
        const dt = date.split("-");
        stDate = dt[1] + "/" + dt[2] + "/" + dt[0];
    }
     
    return stDate;
  } else {
    return "";
  }
}
export function getFormNum(filterData) {
  if (filterData && filterData.formNumber) {
    return filterData.formNumber;
  } else if (filterData && filterData.formula) {
    return filterData.formula;
  }
}
export function getTaxType(filterData) {
  if (filterData && filterData.taxType) {
    return filterData.taxType;
  } else if (filterData && filterData.garnishParamTaxType) {
    return filterData.garnishParamTaxType;
  } else if (filterData && filterData.taxTypeALL) {
    return filterData.taxTypeALL;
  } else if (filterData && filterData.taxTypes) {
    return filterData.taxTypes;
  }
}
export function getCompanyCode(filterData) {
  if (filterData && filterData.company) {
    return filterData.company;
  } else if (filterData && filterData.companyCode) {
    return filterData.companyCode;
  } else if (filterData && filterData.location) {
    return filterData.location;
  }
}
export function getGroupcode(filterData) {
  if (filterData && filterData.groupCode) {
    return filterData.groupCode;
  } else if (filterData && filterData.employeeGroupCode) {
    return filterData.employeeGroupCode;
  }else if (filterData && filterData.garnishmentGroup) {
    return filterData.garnishmentGroup;
  }
}
export function getPmtUsrCode(filterData) {
  if (filterData && filterData.typeOfData) {
    return filterData.typeOfData;
  } else if (filterData && filterData.customTypeOfData) {
    return filterData.customTypeOfData;
  }
}

export function buildAutoCompSelInput(pageid, store, patten, formValues = {}) {
  let state = store.getState();
  console.log(state);
  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    pattern: patten
  };
  return input;
  //return Object.assign(input, formValues);
}
export function buildUsageDataInput(pageid, store, formdata, mode) {
  let state = store.getState();
  console.log("formdata");
  console.log(formdata);
  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    pmtUsrCode: getUsageUserCode(formdata),
    taxCode: getUsageTaxCode(formdata),
    companyCode: getUsageCompany(formdata),
    companyName: getUsageCompnanyName(formdata),
    usrtax: getUsageDataCode(formdata),
    groupCode: getUsageCode(formdata),
    groupName: formdata.groupName
  };
  return input;
}
export function getUsageCode(formdata) {
  if (formdata && formdata.id) {
    return formdata.company;
  } else if (formdata && formdata.code) {
    return formdata.code;
  }
}

export function getUsageCompany(formdata) {
  if (formdata && formdata.company) {
    return formdata.company;
  }
}
export function getUsageCompnanyName(formdata) {
  if (formdata && formdata.companyName) {
    return formdata.companyName;
  }
}
export function getUsageTaxCode(formdata) {
  if (formdata && formdata.taxCode) {
    return formdata.taxCode;
  }
}
export function getUsageUserCode(formdata) {
  if (formdata && formdata.userCode) {
    return formdata.userCode;
  }
}
export function getUsageDataCode(formdata) {
  if (formdata && formdata.code) {
    return formdata.code;
  }
}
export function buildDeleteInput(pageid, store, formdata, mode) {
  let state = store.getState();
  console.log("formdata");
  console.log(formdata);
  
  const {formFilterData} = state;

  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    compCode: getCode(formdata, pageid),
    taxCode: formdata.taxCode,
    taxName: formdata.name,
    type: formdata.taxType,
    code: getCode(formdata, pageid),
    name: getName(formdata, pageid),
    startDate: getFrmStartDate(formdata),
    location: formdata.location,
    street1: formdata.street1,
    street2: formdata.street2,
    city: formdata.city,
    county: formdata.county,
    state: formdata.state,
    zip: formdata.zip,
    runId: formFilterData.runid,
  };
  return input;
}
export function buildSaveInput(pageid, store, formdata, mode) {
  let state = store.getState();
  console.log(formdata);
  let editMode = 0;
  if (mode === "New") {
    editMode = 1;
  } else if (mode === "Edit") {
    editMode = 2;
  }
  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    editMode: editMode,
    code: getCode(formdata, pageid),
    name: getName(formdata, pageid),
    fein: formdata.fein,
    courtesy: formdata.courtesy,
    payCode: formdata.userCode,
    payType: formdata.payType,
    payName: formdata.name,
    e_taxability: formdata.taxability,
    e_maxLimit: formdata.eemax,
    taxCode: formdata.taxCode,
    taxName: formdata.name,
    calcMethod: formdata.cmName,
    flatAmount: formdata.flatAmount,
    maxTax: formdata.maxTax,
    maxWage: formdata.maxWage,
    minWage: formdata.minWage,
    endDate: getFrmEndDate(formdata),
    rounding: formdata.roundingDisplay,
    roundingDisplay: formdata.roundingDisplay,
    startDate: getFrmStartDate(formdata),
    effDate: getFrmEffDate(formdata),
    taxRate: formdata.taxRate,
    type: formdata.taxType,
    location: formdata.location,
    street1: formdata.street1,
    street2: formdata.street2,
    city: formdata.city,
    county: formdata.county,
    state: formdata.state,
    zip: formdata.zip
  };
  return input;
}

export function getCode(formdata, pageid) {
  if (formdata && formdata.company) {
    return formdata.company;
  } else if (formdata && formdata.code) {
    return formdata.code;
  } else if (formdata && formdata.id) {
    return formdata.id;
  } else if (formdata && formdata.bsiAuth) {
    return formdata.bsiAuth;
  } else if (pageid && pageid == "worksiteCompanies") {
    return store.getState().formFilterData.company;
  }
}
export function getName(formdata, pageid) {
  if (formdata && formdata.companyName) {
    return formdata.companyName;
  } else if (formdata && formdata.name) {
    return formdata.name;
  } else if (formdata && formdata.groupName) {
    return formdata.groupName;
  } else if (pageid && pageid == "worksiteCompanies") {
    return store.getState().formFilterData.companyName;
  }
}
export const reqInfo = data => {
  let info = {};
  if (isMock()) {
    info = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    };
  } else {
    info = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    };
  }
  return info;
};

export function getUrl(id) {
  let metadataMap = metadatamap.find(metadatam => id == metadatam.id);
  let url = generateUrl.buildURL(metadataMap.url);
  if (isMock()) {
    // for webpack generated mock data
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      // For custom generated mock data
      metadataMap = mockdatamap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = metadataMap.url;
    }
  }
  console.log("View URL %s for page %s", url, id);
  return url;
}

export function deleteUrl(id) {
  let deldataMap = deletedatamap.find(metadatam => {
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(deldataMap.url);
  if (isMock()) {
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      let deldataMap = mockdelmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = deldataMap.url;
    }
  }
  console.log("Delete URL %s for page %s", url, id);
  return url;
}

export function saveUrl(id) {
  let saveDataMap = savedatamap.find(metadatam => {
    console.log(id, metadatam.id);
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(saveDataMap.url);
  if (isMock()) {
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      let saveDataMap = mocksavmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = saveDataMap.url;
    }
  }
  console.log("Save URL %s for page %s", url, id);
  return url;
}

export function generateReportUrl(id) {
  let generateRportMap = generateDataMap.find(metadatam => {
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(generateRportMap.url);
  if (isMock() && mockDataMapper[id]) {
    url = mockDataMapper[id];
  }
  return url;
}

export function autocompleteURL(id) {
  let autoCompleteDataMap = asyncselfldsmap.find(metadatam => {
    console.log(id, metadatam.id);
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(autoCompleteDataMap.url);
  if (isMock()) {
    if (mockAutoCompleteMap[id]) {
      url = mockAutoCompleteMap[id];
    } else {
      autoCompleteDataMap = mockselectmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = autoCompleteDataMap.url;
    }
  }
  console.log("Save URL %s for page %s", url, id);
  return url;
}

export const setTemplateData = (str, data) => {
  const regex = /\${(.*?)}/gi;
  const matches = str.match(regex);
  if (matches) {
    matches.forEach(match => {
      const regexObj = new RegExp(/\${(.*?)}/, "gi");
      const fieldMatches = regexObj.exec(match);
      if (fieldMatches && fieldMatches[1]) {
        str = str.replace(match, data[fieldMatches[1]]);
      }
    });
  }
  return str;
};

const mockdelmap = [
  { id: "customPayments", url: "./DELETE_CUSTOM_PAYMENT.json" },
  { id: "customTaxCodes", url: "./DELETE_CUSTOM_TAX_CODE.json" }
];
const mocksavmap = [
  { id: "customPayments", url: "./SAVE_CUSTOM_PAYMENT.json" },
  { id: "customTaxCodes", url: "./SAVE_CUSTOM_TAX_CODE.json" },
  { id: "experienceRates", url: "./SAVE_EXPERIENCE_RATES_MOCKDATA.json" },
  { id: "supplementalMethods", url: "SAVE_SUPPLEMENTAL_METHODS_MOCKDATA.json" },
  { id: "customFormulas", url: "./SAVE_CUSTOM_TAX_PAYMENT_MOCKDATA.json" },
  { id: "customTaxFormulas", url: "./SAVE_CUSTOM_TAX_FORMULAS_MOCKDATA.json" },
  { id: "companies", url: "./SAVE_COMPANIES_MOCKDATA.json" },
  { id: "worksites", url: "./SAVE_WORKSITE_MOCKDATA.json" },
  { id: "worksiteCompanies", url: "./SAVE_WORKSITE_COMPANIE_MOCKDATA.json" }
];
const mockdatamap = [
  { id: "sampleDateFields", url: "./DATE_FIELD_DOC_MOCKDATA.json" },
  { id: "customFormulas", url: "./CUSTOM_TAX_PAYMENT_MOCKDATA.json" },
  { id: "customTaxFormulas", url: "./CUSTOM_TAX_FORMULAS_MOCKDATA.json" },
  { id: "companies", url: "./COMPANIES_MOCKDATA.json" },
  { id: "worksites", url: "./COMPANIES_MOCKDATA.json" },
  { id: "worksiteCompanies", url: "./WORKSITES_MOCKDATA.json" },
  { id: "recentUsage", url: "./RECENT_USAGE.json" },
  { id: "selectSamplePage", url: "./RECENT_USAGE.json" }
];

//all for test autoComplete
const mockselectmap = [];
