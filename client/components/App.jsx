import React from "react";

import "react-table/react-table.css";
import { Provider } from "react-redux";

import { Values } from "redux-form-website-template";

import FieldArraysForm from "./Form-field/FieldArraysForm";

import { apiPrefix } from "../config/enviroment";
import "./App.less";

import axios from "axios";
import ReactTable from "react-table";
import store from "./Form-field/store";

const App = React.createClass({
  getInitialState() {
    return {
      bestVacancies: [],
      qualifications: [],
      pageSize: 10,
      showNavigation: false,
      loading: false,
      tableStatus: "vacancies"
    };
  },

  async handleGetBestVacancies(e) {
    this.setState({ loading: true });

    try {
      // TODO: move request to api
      // fetch vacancies
      const { data: vacancies } = await axios({
        url: `${apiPrefix}/getBestVacancies`,
        method: "POST",
        data: { data: e }
      });

      // generate link to rabota.ua
      const dataArray = vacancies.map(vacancy => ({
        ...vacancy,
        description: `https://rabota.ua/company${
          vacancy.companyExternalId
        }/vacancy${vacancy.vacancyId}`
      }));

      this.setState({ bestVacancies: dataArray });
      this.setState({ loading: false, tableStatus: "vacancies" });
      vacancies.length <= 10
        ? this.setState({ pageSize: vacancies.length, showNavigation: false })
        : this.setState({ pageSize: 10, showNavigation: true });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false, tableStatus: "vacancies" });
    }
  },

  handleSkillsInputChange(event) {
    this.setState({ skills: event.target.value });
  },

  async handleGetQualifications() {
    this.setState({ loading: true });
    // TODO: move request to api
    const { data } = await axios({
      url: `${apiPrefix}/qualifications`,
      method: "GET"
    });

    this.setState({ qualifications: data });
    this.setState({
      loading: false,
      tableStatus: "qualifications",
      showNavigation: true
    });
  },

  render() {
    const columnsVacancies = [
      {
        Header: "VacancyId",
        accessor: "vacancyId",
        minWidth: 25
      },
      {
        Header: "Matches",
        accessor: "counter",
        minWidth: 25
      },
      {
        Header: "Title",
        accessor: "vacancyName",
        minWidth: 70
      },
      {
        Header: "City",
        accessor: "cityName",
        minWidth: 30
      },
      {
        Header: "Company",
        accessor: "companyName",
        minWidth: 50
      },
      {
        Header: "Link",
        accessor: "description",
        minWidth: 80,
        Cell: props => (
          <a target="_tab" href={props.value}>
            {props.value}
          </a>
        )
      }
    ];

    const columnsQualifications = [
      {
        Header: "Qualification",
        accessor: "value",
        minWidth: 50
      },
      {
        Header: "Section",
        accessor: "section",
        minWidth: 50
      },
      {
        Header: "Popularity",
        accessor: "counter",
        minWidth: 50
      }
    ];

    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <h2 className="App__header">Hi, Test Engineer!</h2>
            <h2 className="App__header">
              Search for vacancies that match your skills.
            </h2>
            <FieldArraysForm onSubmit={this.handleGetBestVacancies} />
          </div>
        </Provider>

        <button type="submit" onClick={this.handleGetQualifications}>
          Show Qualifications Statistics
        </button>

        <ReactTable
          key={this.state.pageSize}
          data={
            this.state.tableStatus === "vacancies"
              ? this.state.bestVacancies
              : this.state.qualifications
          }
          columns={
            this.state.tableStatus === "vacancies"
              ? columnsVacancies
              : columnsQualifications
          }
          defaultPageSize={this.state.pageSize}
          showPageSizeOptions={false}
          showPagination={this.state.showNavigation}
          showPageJump={this.state.showNavigation}
          noDataText="Sorry, nothing was found. Please change search parameters."
          loading={this.state.loading}
        />
      </div>
    );
  }
});

export default App;
