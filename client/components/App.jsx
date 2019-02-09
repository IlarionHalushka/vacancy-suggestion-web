import React from "react";

import "react-table/react-table.css";
import { Provider } from "react-redux";

import { Values } from "redux-form-website-template";

import FieldArraysForm from "./Form-field/FieldArraysForm";

import api from "../api";
import tableStatuses from "../config/tableStatuses";
import "./App.less";

import ReactTable from "react-table";
import store from "./Form-field/store";

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

const App = React.createClass({
  getInitialState() {
    return {
      bestVacancies: [],
      qualifications: [],
      pageSize: 10,
      showNavigation: false,
      loading: false,
      tableStatus: tableStatuses.VACANCIES
    };
  },

  async handleGetBestVacancies(e) {
    this.setState({ loading: true });

    try {
      const { data: vacancies } = await api.getVacancies(e);

      // generate link to vacancy on rabota.ua
      const vacanciesWithDescription = vacancies.map(vacancy => ({
        ...vacancy,
        description: `https://rabota.ua/company${
          vacancy.companyExternalId
        }/vacancy${vacancy.vacancyId}`
      }));

      const nextState = {
        showNavigation: false,
        bestVacancies: vacanciesWithDescription,
        loading: false,
        tableStatus: tableStatuses.VACANCIES
      };
      vacancies.length <= 10
        ? this.setState({ pageSize: vacancies.length, ...nextState })
        : this.setState({ pageSize: 10, ...nextState });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false, tableStatus: tableStatuses.VACANCIES });
    }
  },

  async handleGetQualifications() {
    this.setState({ loading: true });

    try {
      const { data } = await api.getQualifications();

      this.setState({
        qualifications: data,
        loading: false,
        tableStatus: tableStatuses.QUALIFICATIONS,
        showNavigation: true,
        pageSize: 10
      });
    } catch (e) {
      console.error(e);
      this.setState({
        loading: false,
        tableStatus: tableStatuses.QUALIFICATIONS
      });
    }
  },

  render() {
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
            this.state.tableStatus === tableStatuses.VACANCIES
              ? this.state.bestVacancies
              : this.state.qualifications
          }
          columns={
            this.state.tableStatus === tableStatuses.VACANCIES
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
