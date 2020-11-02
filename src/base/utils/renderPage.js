import React from "react";
import UserDataQueries from "../../app/components/UserDataQueries";
import MappingTools from "../../app/components/MappingTools";
import MapToolUsage from "../../app/components/MapToolUsage";
import DateFieldDoc from "../../app/components/DateFieldDoc";
import MaritalStatusReport from "../../app/components/MaritalStatusReport";
import BatchTest from "../../app/components/BatchTest";
import MessagesToSuppress from "../../app/components/MessagesToSuppress";
import Home from "../../app/home/home";

const renderPage = (pgid, help, initialProps) => {
  let page;
  switch (pgid) {
    case "userDataQueries":
      page = <UserDataQueries help={help} />;
      break;
    case "mappingTools":
      page = <MappingTools help={help} pgid={pgid}/>;
      break;
    case "taxCodeUsage":
    case "taxTypeUsage":
    case "paymentCodeUsage":
      page = <MapToolUsage help={help} pgid={pgid} />;
      break;
    case "dateFieldDoc":
      page = <DateFieldDoc help={help} />;
      break;
    case "maritalStatusReport":
      page = <MaritalStatusReport help={help} pgid={pgid} initialProps={initialProps}/>;
      break;
    case "batchTest":
      page = <BatchTest help={help} pgid={pgid} />;
      break;
    case "messageToSuppress":
      page = <MessagesToSuppress help={help} pgid={pgid} />;
      break;
    default:
      page = <Home />;
      break;
  }
  return page;
};

export default renderPage;
