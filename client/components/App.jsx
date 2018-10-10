import React from "react";

import "react-table/react-table.css";
import { Provider } from "react-redux";

import { Values } from "redux-form-website-template";

import FieldArraysForm from "./Form-field/FieldArraysForm";

import "./App.less";

import axios from "axios";
import ReactTable from "react-table";
import store from "./Form-field/store";

const App = React.createClass({
  getInitialState() {
    return {
      bestVacancies: "",
      pageSize: 10,
      showNavigation: false,
      loading: false
    };
  },

  handleGetBestVacancies(e) {
    let idsArray = [];
    let dataArray = [];
    this.setState({ loading: true });

    (async () => {
      const { data } = await axios({
        url: "http://localhost:8080/getBestVacancies",
        method: "POST",
        data: { data: e }
      });
      for (let i = 0; i < data.length; i++) {
        idsArray.push(data[i].vacancyId);
      }

      this.setState({ bestVacancies: data });
      if (data.length <= 10) {
        this.setState({ pageSize: data.length, showNavigation: false });
      } else {
        this.setState({ pageSize: 10, showNavigation: true });
      }

      let vacancies = this.state.bestVacancies;
      for (let i = 0; i < idsArray.length; i++) {
        let data = {
          vacancyId: vacancies[i].vacancyId,
          counter: vacancies[i].counter,
          companyName: vacancies[i].companyName,
          companyId: vacancies[i].companyId,
          cityName: vacancies[i].cityName,
          vacancyName: vacancies[i].vacancyName,
          description: `https://rabota.ua/company${
            vacancies[i].companyExternalId
          }/vacancy${vacancies[i].vacancyId}`
        };

        dataArray.push(data);
        this.setState({ bestVacancies: dataArray });
        this.setState({ loading: false });
      }
      return dataArray;
    })();
  },

  handleSkillsInputChange(event) {
    this.setState({ skills: event.target.value });
  },

  render() {
    const data = this.state.bestVacancies || [];

    const columns = [
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

    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <h2 className="App__header">
              Search for vacancies that match your skills
            </h2>
            <FieldArraysForm onSubmit={this.handleGetBestVacancies} />
          </div>
        </Provider>

        <ReactTable
          key={this.state.pageSize}
          data={data}
          columns={columns}
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
