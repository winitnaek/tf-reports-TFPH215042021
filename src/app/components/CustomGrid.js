import React, { Component , Fragment} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { tftools } from "../../base/constants/TFTools";
import { ReusableGrid, ConfirmModal } from "bsiuilib";
import { setFilterFormData } from "../actions/filterFormActions";
import { setFormData } from "../actions/formActions";
//import { getRecentUsage } from "../actions/usageActions";
import {getUsageData} from "../api/getUsageDataAPI";
import savegriddataAPI from "../api/savegriddataAPI";
import mappingToolUsageAPI from "../api/mappingToolUsageAPI";
import deletegriddataAPI from "../api/deletegriddataAPI";
import autocompleteSelectAPI from "../api/autocompleteselectAPI";
import * as gridStyles from "../../base/constants/AppConstants";

class CustomGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false
    };

    this.renderGrid = pgData => {
      renderTFApplication("pageContainer", pgData);
    };

    this.formAction = data => {
      console.log(data);
      console.log("you made it back to customGrid");
      this.props.setFormData(data);
    };

    this.filterFormAction = formData => {
      console.log("Setting filterForm Data");
      const mode = "Edit";
      const index = null;
      const data = { data: this.props.formFilterData, mode, index };
      console.log(this.props.formFilterData);
      //  this.props.setFormData(data)    //  This is needed for subsequent edits to get form data
      this.props.setFilterFormData(formData); // This is used to make the api call to render the grid
    };

    this.handleOk = () => {
      this.setState({
        showAlert: false
      });
    };
  }

  componentDidMount() {
    const { metadata, pageid } = this.props;
    const { pgdef } = metadata(pageid);
    const { metaInfo } = pgdef;
    this.setState({
      showAlert: !!metaInfo
    });
  }

  render() {
    const {
      pageid,
      metadata,
      pid,
      permissions,
      griddata,
      help,
      gridProps,
      formData,
      formFilterData,
      fieldData,
      formMetaData,
      className=''
    } = this.props;

    const { pgdef } = metadata(pageid);
    const { metaInfo } = pgdef;

    const { formAction, filterFormAction } = this;
    return (
      <Fragment>
        <ReusableGrid
          pageid={pageid}
          metadata={metadata}
          pid={pid}
          permissions={permissions}
          griddata={griddata}
          help={help}
          gridProps={gridProps}
          tftools={tftools}
          saveGridData={savegriddataAPI}
          setFilterFormData={filterFormAction}
          setFormData={formAction}
          deleteGridData={deletegriddataAPI}
          recentUsage={getUsageData}
          renderGrid={this.renderGrid}
          formMetaData={formMetaData}
          formData={formData}
          formFilterData={formFilterData}
          fieldData={fieldData}
          autoComplete={autocompleteSelectAPI}
          styles={gridStyles}
          mapToolUsage={mappingToolUsageAPI}
          className={className}
        />
        <ConfirmModal showConfirm={this.state.showAlert} handleOk={this.handleOk} {...metaInfo} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formData: state.formData,
    formFilterData: state.formFilterData
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {setFilterFormData, setFormData },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomGrid);
