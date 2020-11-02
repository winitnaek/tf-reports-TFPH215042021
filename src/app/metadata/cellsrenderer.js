import React from 'react'; 
let row = null;

export function authCodeauthNamerenderer(ndex,
	datafield,
	value,
	defaultvalue,
	column,
	rowdata
) {
	return rowdata.authorityCode +'-' + rowdata.authorityName;
}
export function formulaNamerenderer(ndex,
	datafield,
	value,
	defaultvalue,
	column,
	rowdata
) {
	return `<div style="text-align:left;padding-top:5px;padding-left:3px" class="align-self-center align-middle">${rowdata.formula +'-' + rowdata.formulaTitle}</div>`
}
export function baiAuthAuthNamerenderer(ndex,
	datafield,
	value,
	defaultvalue,
	column,
	rowdata
) {
	return `<div style="text-align:left;padding-top:5px;padding-left:3px" class="align-self-center align-middle">${rowdata.bsiAuth +'-' + rowdata.authName}</div>`;
}
export function taxTypeCodeNamerenderer(ndex,
	datafield,
	value,
	defaultvalue,
	column,
	rowdata
) {
	return `<div style="text-align:left;padding-top:5px;padding-left:3px" class="align-self-center align-middle">${rowdata.taxType + '-' + rowdata.taxTypeName}</div>`;
}
export function courtesyRenderer(
  ndex,
  datafield,
  value,
  defaultvalue,
  column,
  rowdata
) {
  if (rowdata.courtesy) {
	return '<div style="text-align:left;padding-top:5px;padding-left:3px" class="align-self-center align-middle">On</div>';
  } else {
    return "";
  }
}
export function editCellsRenderer(
	ndex,
	datafield,
	value,
	defaultvalue,
	column,
	rowdata
  ) {
	  row = ndex
	return ` <div id='edit-${ndex}'style="text-align:center; margin-top: 10px; color: #4C7392" onClick={console.log(${ndex})}> <i class="fas fa-pencil-alt  fa-1x" color="primary"/> </div>`;
  }


  export function deleteCellsRenderer(
	ndex,
	datafield,
	value,
	defaultvalue,
	column,
	rowdata
  ) {
	row = ndex
	return ` <div id='delete-${ndex}'style="text-align:center; margin-top: 10px; color: #4C7392" onClick={console.log(${ndex})}> <i class="fas fa-calendar-minus  fa-1x" color="primary"/> </div>`;
  }

export const getRowIndex = () => {
	return row;
}