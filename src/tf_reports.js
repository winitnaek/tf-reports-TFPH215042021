import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./base/config/configureStore";
import * as rname from "./base/constants/RenderNames";
import { Progress } from "bsiuilib";
import * as manifest from "../build/_manifest";
import * as c from "./base/constants/IndexConstants";
import { makeNavs, makeSearch } from "./base/template/navGenerator";
import TFHome from "./app/home/home.js";
import { closeForm, setFormData } from "./app/actions/formActions";
import { setFilterFormData } from "./app/actions/filterFormActions";
import TestHarness from "./app/test/TestHarness";
import CustomComp from "./app/components/CustomComp";
import MessageViewerContainer from "./app/components/MessageViewerContainer";
import * as fieldData from "./app/metadata/fieldData";
import { getFavoriteLinks } from "./app/home/actions/favoriteLinksActions";
let store = configureStore();
export default store;
let MOCK = process.env.NODE_ENV === "development" ? false : false;
setIsMock(MOCK);
import {
  buildModuleAreaLinks,
  openHelp,
  setPerms,
  compMetaData,
  getMetaData,
  compPermissions,
  buildGridDataInput,
  decorateData,
  formatFieldData
} from "./base/utils/tfUtils";
import { setModuleAreas } from "./app/home/actions/moduleLinksActions";
import CustomGrid from "./app/components/CustomGrid";
import ReusablePage from "./app/components/ReusablePage";
import { UI_COMP, UI_PAGE, UI_TEST, tftools ,UI_EXTN} from "./base/constants/TFTools";
import griddataAPI from "./app/api/griddataAPI";
//Temporary set user in session:======Comment this when deployed with MAC======
if (!sessionStorage.getItem("up")) {
  var userProfile = '{"userId":"vinit","dataset":"VINIT","securitytokn":"6d976b4e3ef843119dc1b66017160837","branding":"base64ImageData","userTheme":"Default","roles":["ER"],"applications":[{"id":"73b9a516-c0ca-43c0-b0ae-190e08d77bcc","name":"TaxFactory","accessIds":[{"id":"162ebe14-8d87-44e1-a786-c9365c9d5cd8","visible":true}],"permissions":{"UQ":[1,1,1,1,0],"MS":[1,1,1,1,0],"QF":[1,1,1,1,0],"PQF":[1,1,1,1,0],"WQF":[1,1,1,1,0],"TH":[1,1,1,1,0],"TR":[1,1,1,1,0],"PA":[1,1,1,1,0]}}],"themeList":[{"id":"Default","name":"Default"},{"id":"HighContrast","name":"HighContrast"},{"id":"WhiteOnBlack","name":"WhiteOnBlack"},{"id":"BlackOnWhite","name":"BlackOnWhite"}]}';
  var userdata = JSON.parse(userProfile);
  if (isMock()) {
    let thPerm = [1, 1, 1, 1, 0];
    let noOfPerm = Object.keys(userdata.applications[0].permissions).length;
    userdata.applications[0].permissions["TH"] = thPerm;
    userdata.applications[0].permissions["SP"] = thPerm;
    userdata.applications[0].permissions["DF"] = thPerm;
    let up = JSON.stringify(userdata);
    sessionStorage.setItem("up", up);
  } else {
    sessionStorage.setItem("up", userProfile);
  }
}
//==============================================================================
let usrobj = JSON.parse(sessionStorage.getItem("up"));

var dataset = usrobj.dataset;
var userId = usrobj.userId;
setModulePermissions(usrobj.applications);
let moduleAreas = buildModuleAreaLinks(usrobj.applications);

/**
 * renderTFApplication TEST
 * master branch
 * @param {*} elem
 * @param {*} renderName
 */
function renderTFApplication(elem, renderName, renderCtx) {
  setAppAnchor(elem);
  setAppUserIDAndDataset(dataset, userId);
  if (renderName === rname.RN_TF_HOME) {
    showPrgress(elem);
    //store.dispatch(setModuleAreas(moduleAreas));
    store.dispatch(getFavoriteLinks(userId,1));
    setTimeout(
      function () {
        renderTFHome(elem);
      }.bind(this),
      600
    );
    if(renderCtx){
      setTimeout(
        function () {
          renderTFApplication('pageContainer', renderCtx); 
        }.bind(this),
        600
      );
      
    }
  } else if (renderName && renderName.type == UI_COMP) {
    if (renderName.id === "messageViewer" || renderName.id === "messagesViewer") {
      renderMessageViewer(elem, renderName.id, renderName.value);
    } else {
      renderComponent(elem, renderName.id, renderName.value);
    }
  } else if (renderName && renderName.type == UI_PAGE) {
      renderNewPage(elem, renderName.id, renderName.value,null);
  } else if (renderName && renderName.type == UI_TEST) {
    renderTestHarness(elem, renderName.id, renderName.value);
  } else if (renderName && renderName === rname.RN_TF_CSTMCOMP) {
    renderCustomComponent(elem, renderName);
  } else if (renderName && renderName.type == UI_EXTN) {
      window.open(renderName.href, "_blank");
  }
}

/**
 * renderMessageViewer
 * @param {*} elem
 */

function renderMessageViewer(elem, pageid, pid) {
  ReactDOM.unmountComponentAtNode(document.querySelector("#" + elem));
  const gridInput = buildGridDataInput(pageid, store);
  const state = store.getState();
  const dispatch = store.dispatch;
  const fieldDataX = formatFieldData(fieldData[pageid], pageid, appUserId());
  const gridProps = {
    state,
    dispatch,
    closeForm,
    setFormData,
    setFilterFormData,
    renderGrid: renderTFApplication
  };
  const metadata = compMetaData(pageid);
  ReactDOM.render(
    <Provider store={store}>
          <MessageViewerContainer
            pageid={pageid}
            metadata={metadata}
            pid={pid}
            permissions={compPermissions}
            help={openHelp}
            gridProps={gridProps}
            fieldData={fieldDataX}
            formMetaData={metadata}
            getGridData={griddataAPI.getGridData}
            gridInput={gridInput}
          />
    </Provider>,
    document.querySelector("#" + elem)
  );
}

/**
 * renderComponent
 * @param {*} elem
 */
function renderComponent(elem, pageid, pid) {
  ReactDOM.unmountComponentAtNode(document.querySelector("#" + elem));
  showPrgress(elem);
  let gridInput = buildGridDataInput(pageid, store);

  const state = store.getState();
  const dispatch = store.dispatch;

  const renderGrid = renderTFApplication;
  const gridProps = {
    state,
    dispatch,
    closeForm,
    setFormData,
    setFilterFormData,
    renderGrid
  };

  

  griddataAPI
    .getGridData(pageid, gridInput)
    .then(response => response)
    .then(griddata => {
      const metaData = getMetaData(pageid);
      let griddatanew = decorateData(griddata, pageid);
      const fieldDataX = formatFieldData(fieldData[pageid], pageid, appUserId());
      const isSingleTable = !(metaData instanceof Array);

      if (isSingleTable && griddatanew[0] instanceof Array) {
        griddatanew = griddatanew[0];
      }

      ReactDOM.render(
        <Provider store={store}>
          <Fragment>
            {!isSingleTable ? (
              griddatanew.map((data, key) => (
                <CustomGrid
                  pageid={pageid}
                  metadata={compMetaData(pageid, key)}
                  pid={pid}
                  permissions={compPermissions}
                  griddata={data}
                  help={openHelp}
                  gridProps={gridProps}
                  fieldData={fieldDataX}
                  className={key !== 0 ? 'mt-3' : '' }
                />
              ))
            ) : (
              <CustomGrid
                pageid={pageid}
                metadata={compMetaData(pageid)}
                pid={pid}
                permissions={compPermissions}
                griddata={griddatanew}
                help={openHelp}
                gridProps={gridProps}
                fieldData={fieldDataX}
              />
            )}
          </Fragment>
        </Provider>,
        document.querySelector("#" + elem)
      );
    });
}
/**
 * renderTestHarness
 * @param {*} elem
 * @param {*} pgid
 * @param {*} pid
 */
function renderTestHarness(elem, pgid, pid) {
  ReactDOM.render(
    <Provider store={store}>
      <TestHarness pgid={pgid} />
    </Provider>,
    document.querySelector("#" + elem)
  );
}
/**
 * renderPage
 * @param {*} elem
 */
function renderTestComponent(elem, tool, metadata, mockdata, fieldData) {
  setMockMetadata(metadata);
  const state = store.getState();
  const dispatch = store.dispatch;
  const renderGrid = renderTFApplication;
  const gridProps = {
    state,
    dispatch,
    closeForm,
    setFormData,
    setFilterFormData,
    renderGrid
  };
  ReactDOM.render(
    <Provider store={store}>
      <CustomGrid
        pageid={tool.id}
        metadata={testMetaData}
        pid={tool.value}
        permissions={compPermissions}
        griddata={mockdata}
        help={openHelp}
        gridProps={gridProps}
        fieldData={fieldData}
        formMetaData={metadata}
      />
    </Provider>,
    document.querySelector("#" + elem)
  );
}
export function testMetaData(pgid) {
  return getMockMedata();
}
/**
 * renderPage
 * @param {*} elem
 */
function renderNewPage(elem, pgid, pid, initialProps) {
  const help = openHelp;
  ReactDOM.render(
    <Provider store={store}>
      <ReusablePage pgid={pgid} help={help} initialProps={initialProps} pid={pid} />
    </Provider>,
    document.querySelector("#" + elem)
  );
}

/**
 * showPrgress
 * @param {*} elem
 */
function showPrgress(elem) {
  ReactDOM.render(
    <Provider store={store}>
      <Progress />
    </Provider>,
    document.querySelector("#" + elem)
  );
}

/**
 * renderTFHome
 * @param {*} elem
 */
function renderTFHome(elem) {
  ReactDOM.render(
    <Provider store={store}>
      <TFHome />
    </Provider>,
    document.querySelector("#" + elem)
  );
}
/**
 * renderTFHome
 * @param {*} elem
 */
function renderCustomComponent(elem) {
  ReactDOM.unmountComponentAtNode(document.querySelector("#" + elem));
  showPrgress(elem);
  ReactDOM.render(
    <Provider store={store}>
      <CustomComp />
    </Provider>,
    document.querySelector("#" + elem)
  );
}
var APP_ANCHOR;
function setAppAnchor(elem) {
  APP_ANCHOR = elem;
  ReactDOM.unmountComponentAtNode(document.querySelector("#" + elem));
}
function appAnchor() {
  return APP_ANCHOR;
}
var APP_DATASET, APP_USERID, IS_MOCK, METADATA_MOCK;
function appDataset() {
  return APP_DATASET;
}
function appUserId() {
  return APP_USERID;
}
function isMock() {
  return IS_MOCK;
}
function setIsMock(mock) {
  IS_MOCK = mock;
}
function getMockMedata() {
  return METADATA_MOCK;
}
function setMockMetadata(metadata) {
  METADATA_MOCK = metadata;
}
function setAppUserIDAndDataset(dataset, userid) {
  APP_DATASET = dataset;
  APP_USERID = userid;
}
//************Right & Permissions******************/
var UQ_RIGHTS, ALL_RIGHTS, MS_RIGHTS, QF_RIGHTS, WQF_RIGHTS, PQF_RIGHTS, TH_RIGHTS,TR_RIGHTS,PA_RIGHTS;
function setUQRights(perm) {
  UQ_RIGHTS = setPerms(perm);
}
function hasUQRights() {
  return UQ_RIGHTS;
}
function setAlRights(perm) {
  ALL_RIGHTS = perm;
}
function getAllRights() {
  return ALL_RIGHTS;
}
function setMSRights(perm) {
  MS_RIGHTS = setPerms(perm);
}
function hasMSRights() {
  return MS_RIGHTS;
}
function setQFRights(perm) {
  QF_RIGHTS = setPerms(perm);
}
function hasQFRights() {
  return QF_RIGHTS;
}
function setWQFRights(perm) {
  WQF_RIGHTS = setPerms(perm);
}
function hasWQFRights() {
  return WQF_RIGHTS;
}
function setPQFRights(perm) {
  PQF_RIGHTS = setPerms(perm);
}
function hasPQFRights() {
  return PQF_RIGHTS;
}
function setTHRights(perm) {
  TH_RIGHTS = setPerms(perm);
}
function hasTHRights() {
  return TH_RIGHTS;
}
function setTRRights(perm) {
  TR_RIGHTS = setPerms(perm);
}
function hasTRRights() {
  return TR_RIGHTS;
}
function setPARights(perm) {
  PA_RIGHTS = setPerms(perm);
}
function hasPARights() {
  return PA_RIGHTS;
}
//************Right & Permissions******************/
function setModulePermissions(apps) {
  apps.forEach(function (app) {
    if (app.id == "73b9a516-c0ca-43c0-b0ae-190e08d77bcc") {
      app.accessIds.forEach(function (access) {
        if (access.id == "162ebe14-8d87-44e1-a786-c9365c9d5cd8" && access.visible == true) {
          setUQRights(app.permissions.UQ);
          setMSRights(app.permissions.MS);
          setQFRights(app.permissions.QF);
          setTHRights(app.permissions.TH);
          setTRRights(app.permissions.TR);
          setPARights(app.permissions.PA);
          setPQFRights(app.permissions.PQF);
          setWQFRights(app.permissions.WQF);
          setAlRights(app.permissions);
        }
      });
    }
  });
}
function onloadPdfData(id) {
  var w2data = {
    loadeew2: true,
    eew2id: id
  };
  store.dispatch(loadPdfData(w2data));
}
function onloadCompData(id) {
  var compdata = {
    loadcomp: true,
    compid: id
  };
  store.dispatch(loadCompData(compdata));
}

const resolveTemplates = async () => {
  let response = await fetch("templates.html");
  let templates = await response.text();
  console.debug("templates => ");
  console.debug(templates);
  return templates;
};

const initIndexPage = templData => {
  let mnfst = manifest._manifest;
  console.debug("manifest =>", mnfst);

  if (!mnfst) {
    console.error("ERROR: Manifest not found!");
    throw new Error("Manifest not found!");
  }

  if (!mnfst.name || !mnfst.desc) {
    console.error("ERROR: Manifest missing application name and/or application description!");
    throw new Error("Application name and/or application description not found!");
  }
  $("#" + c.appTitleId).html($("#" + c.appTitleId).html() + " " + mnfst.desc);
  $("#" + c.appNameId).html($("#" + c.appNameId).html() + " " + mnfst.desc);
  checkIfAreasDefined(mnfst.areas);
  let visAreas = getVisibleAreas(mnfst);

  if (visAreas && visAreas.length) {
    let navInput = {
      areas: visAreas,
      rf: mnfst.renderFunction,
      anchorId: c.appContentId
    };
    document.body.insertAdjacentHTML("afterend", templData);
    makeNavs(navInput);
  }
  let search = getSearchData(mnfst);
  if (search) {
    let searchInput = {
      id: search[0].id,
      renderName: search[0].rendername,
      entities: search[0].entities,
      rf: mnfst.renderFunction,
      anchorId: c.appContentId
    };
    makeSearch(searchInput);
  } else {
    //Hide Search Input
  }
};

const getVisibleAreas = mnfst => {
  let visibleAreas = mnfst.areas.filter(a => {
    return a.visible === true;
  });
  console.debug("visible areas =>", visibleAreas);

  if (!visibleAreas || !visibleAreas.length) {
    console.warn("No visible areas specified!");
    $("#noVsblAreasAlrt").removeClass("d-none").show();
  } else {
    $("#noVsblAreasAlrt").removeClass("d-none").hide();
  }

  return visibleAreas;
};

const getSearchData = mnfst => {
  console.debug("search data =>", mnfst.search);
  let searchdata = mnfst.search;
  return searchdata;
};

const checkIfAreasDefined = areas => {
  if (!areas) {
    console.error("ERROR: At least one area must be defined in manifest!");
    throw new Error("No areas defined in manifest!");
  }
};

const renderWelcomePage = elem => {
  document.getElementById(elem).innerHTML =
    "<h3>Welcome to the Application Module Test Page. Please click on the links to load your single page application.</h3>";
};

const unMountNMountContainerNode = () => {
  $("div").remove("#" + c.appContentId);
  $('<div id="' + c.appContentId + '" class="main-content"></div>').insertAfter($("#" + c.navId));
};

module.exports = renderTFApplication;
window.renderTFApplication = renderTFApplication;

module.exports = appDataset;
window.appDataset = appDataset;

module.exports = appUserId;
window.appUserId = appUserId;

module.exports = appAnchor;
window.appAnchor = appAnchor;
//************Right & Permissions******************/
module.exports = hasUQRights;
window.hasUQRights = hasUQRights;

module.exports = getAllRights;
window.getAllRights = getAllRights;

module.exports = hasMSRights;
window.hasMSRights = hasMSRights;

module.exports = hasQFRights;
window.hasQFRights = hasQFRights;

module.exports = hasPQFRights;
window.hasPQFRights = hasPQFRights;

module.exports = hasWQFRights;
window.hasWQFRights = hasWQFRights;

module.exports = hasTHRights;
window.hasTHRights = hasTHRights;

module.exports = hasTRRights;
window.hasTRRights = hasTRRights;

module.exports = hasPARights;
window.hasPARights = hasPARights;
//************Right & Permissions******************/
module.exports = onloadPdfData;
window.onloadPdfData = onloadPdfData;

module.exports = onloadCompData;
window.onloadCompData = onloadCompData;

module.exports = isMock;
window.isMock = isMock;

module.exports = renderTestComponent;
window.renderTestComponent = renderTestComponent;

let w2aIndex = {
  resolveTemplates: resolveTemplates,
  init: initIndexPage,
  reloadContent: unMountNMountContainerNode,
  renderWelcomePage: renderWelcomePage,
  nameId: c.appNameId,
  contentId: c.appContentId
};

window.w2aIndex = w2aIndex;