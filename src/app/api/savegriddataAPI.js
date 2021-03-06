import {appError, getAdminErrorMessage}  from "bsiuilib";
import {saveUrl, reqInfo,buildSaveInput} from "../../base/utils/tfUtils";
import store from '../../tf_reports';
class savegriddataAPI {
  static saveGridData(pageid, data, mode) {
    console.log("Made it to the savegriddata api");
    console.log(pageid);
    let url = saveUrl(pageid);
    console.log(url);
    let formInput = buildSaveInput(pageid, store, data, mode);
    let tt = JSON.stringify(formInput);
    return fetch(url, reqInfo(tt))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to Save Grid Data Record." + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch((error) => {
        return error;
      });
  }
}

export default savegriddataAPI;