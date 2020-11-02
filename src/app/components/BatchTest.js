import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, UncontrolledTooltip, Button } from "reactstrap";
import { CustomFile, CustomCheckbox } from "bsiuilib";
import generateReportAPI from "../api/generateReportAPI";
import * as metaData from "../metadata/metaData";
import * as styles from "../../base/constants/AppConstants";
import * as fieldData from "../metadata/fieldData";
import { tftools as tfTools } from "../../base/constants/TFTools";
import { setFilterFormData } from "../actions/filterFormActions";

class BatchTest extends Component {
  constructor(props) {
    super(props);
    const { pgid } = this.props;
    const [uploadField, modeField] = fieldData[pgid];
    this.state = {
      uploadResults: null,
      values: {
        [uploadField.id]: uploadField.value,
        [modeField.id]: modeField.value || []
      }
    };
    const toBase64 = file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

    this.onFileSelect = event => {
      const [file] = event.target.files;
      const { values } = this.state;
      const { pgid } = this.props;
      const [uploadField] = fieldData[pgid];
      values[uploadField.id] = event.target.value;
      this.setState(
        {
          values
        },
        async () => {
          this.base64File = await toBase64(file);
        }
      );
    };

    this.onFilterChange = (fieldId, value) => {
      const { values } = this.state;
      values[fieldId] = value;
      this.setState({
        values
      });
    };

    this.onUpload = () => {
      const { pgid } = this.props;
      const [uploadField, modeField] = fieldData[pgid];
      const { base64File } = this;
      const { values } = this.state;
      const data = {
        [uploadField.id]: base64File,
        [modeField.id]: values[modeField.id]
      };
      generateReportAPI.generate(pgid, data).then(uploadResults => {
        this.setState({
          uploadResults,
          values: {
            [uploadField.id]: "",
            [modeField.id]: []
          }
        });
      });
    };
  }

  render() {
    const { pgid } = this.props;
    const { values, uploadResults } = this.state;
    const { pgdef } = metaData[pgid];
    const [uploadField, modeField] = fieldData[pgid];
    return (
      <Container>
        <Row>
          <h1 style={styles.pagetitle}>{pgdef.pgtitle}</h1>
          <span style={{ marginLeft: "10px" }}>
            <span id="help">
              <span>
                <i className="fas fa-question-circle  fa-lg" onClick={this.OpenHelp} style={styles.helpicon} />
              </span>
            </span>
            <UncontrolledTooltip placement="right" target="help">
              <span> {pgdef.helpLabel} </span>
            </UncontrolledTooltip>
          </span>
          {pgdef.pgsubtitle && <p>{pgdef.pgsubtitle}</p>}
        </Row>
        <Row>
          <Col>
            <CustomFile {...uploadField} value={values[uploadField.id]} onChange={this.onFileSelect} />
            <CustomCheckbox {...modeField} value={values[modeField.id]} onChange={this.onFilterChange} />
            <div className="clearfix">
              <Button color="success" className="float-right" onClick={this.onUpload}>
                Upload
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <label>{pgdef.messageLabel}</label>
              {uploadResults && uploadResults.status !== "ERROR" && uploadResults.results ? (
                <UploadResults {...uploadResults} />
              ) : (
                <p>{uploadResults && uploadResults.message ? uploadResults.message : null}</p>
              )}
            </div>
            {pgdef.disclaimer && <p>{pgdef.disclaimer}</p>}
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    isOpen: state.formData.isOpen,
    formData: state.formData,
    formFilterData: state.formFilterData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilterFormData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchTest);

export const UploadResults = props => {
  const { uploadStatus, batchStatus, instruction, results } = props;
  const openMessageViewer = () => {
    const data = tfTools.find(tool => tool.id === "messageViewer");
    if (data) {
      renderTFApplication("pageContainer", data);
    }
  };

  return (
    <Fragment>
      <div className="border p-2 mb-3">
        <p>{uploadStatus}</p>
        <p>{batchStatus}</p>
        <p>{instruction}</p>
        {results.map(result => (
          <ResultRow {...result} />
        ))}
      </div>
      <p>
        Open{" "}
        <span className="text-primary" style={{cursor:'pointer'}} onClick={openMessageViewer}>
          Message Viewer
        </span>{" "}
        for details.
      </p>
    </Fragment>
  );
};

export const ResultRow = props => {
  const { label, link, linkLabel, size } = props;
  return (
    <Row>
      <Col xs="6">
        {label}
        <a href={link} target="_blank">
          {link}
        </a>
      </Col>
      <Col xs="3">
        <a className="text-danger" href={link} target="_blank">
          {linkLabel}
        </a>
      </Col>
      <Col xs="3">{size}</Col>
    </Row>
  );
};
