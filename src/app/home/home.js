import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container } from "reactstrap";
import Welcome from "./Welcome";
import { setModuleLinks } from "./actions/moduleLinksActions";
import { saveFavoriteLinks } from "./favoriteLinksActions";
import { SearchBar } from "bsiuilib";
import { tftools } from "../../base/constants/TFTools";

class TFHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: true,
      sideDrawerOpen: true,
      getGridData: this.props.fetchGridData
    };

    this.sectionLayout = [
      [
        {
          section: "Tax Details",
          sectionHeader: "Tax Details",
          sectionIcon: "book",
          value: "UQ"
        },
        {
          section: "formulas",
          sectionHeader: "Quick Formulas",
          sectionIcon: "flask",
          value: "UQ"
        }
      ],
      [
        {
          sectionHeader: "User Data Queries",
          section: "User Data Queries",
          sectionIcon: "users",
          value: "UQ",
          from: 0,
          to: 17
        }
      ],
      [
        {
          section: "User Data Queries",
          sectionIcon: "users",
          value: "UQ",
          from: 17
        }
      ]
    ];
  }

  getJsonCallback() {
    console.log(this.refs.formBuilder.getJson(data));
  }

  renderApplication(data) {
    renderTFApplication("pageContainer", data);
  }

  getOptions() {
    const excluededPages = ['testHarness', 'selectSamplePage', 'dateFieldDoc']
    return tftools.filter(tool => !excluededPages.includes(tool.id));
  }

  render() {
    return (
      <div style={{ marginTop: 0 }}>
        <Container fluid style={{ overflowY: "auto" }}>
          <SearchBar
            title="Reports"
            sectionLayout={this.sectionLayout}
            options={this.getOptions()}
            favorites={this.props.favorites}
            setFavorite={this.props.saveFavoriteLinks}
            renderApplication={this.renderApplication}
          />
          <Row>
            <Col>
              <div id="pageContainer" className="container w-100 pl-5 pr-5" style={{ maxWidth: "100%" }}>
                <Welcome sectionLayout={this.sectionLayout} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    favorites: state.favoriteLinks.filter(opt => opt.id !== "testHarness")
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setModuleLinks, saveFavoriteLinks }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TFHome);
