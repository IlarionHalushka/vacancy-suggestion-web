import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './App.less';

import { Provider } from 'react-redux';
import FieldArraysForm from './Form-field/FieldArraysForm';
import store from './Form-field/store';

import api from '../api';
import tableStatuses from '../config/tableStatuses';
import { defaultPageSize } from '../config/enviroment';

const columnsVacancies = [
  {
    Header: 'VacancyId',
    accessor: 'vacancyId',
    minWidth: 25,
  },
  {
    Header: 'Matches',
    accessor: 'counter',
    minWidth: 25,
  },
  {
    Header: 'Title',
    accessor: 'vacancyName',
    minWidth: 70,
  },
  {
    Header: 'City',
    accessor: 'cityName',
    minWidth: 30,
  },
  {
    Header: 'Company',
    accessor: 'companyName',
    minWidth: 50,
  },
  {
    Header: 'Link',
    accessor: 'description',
    minWidth: 80,
    Cell: ({ value }) => (
      <a target="_tab" href={value}>
        {value}
      </a>
    ),
  },
];

const columnsQualifications = [
  {
    Header: 'Qualification',
    accessor: 'value',
    minWidth: 50,
  },
  {
    Header: 'Section',
    accessor: 'section',
    minWidth: 50,
  },
  {
    Header: 'Popularity',
    accessor: 'counter',
    minWidth: 50,
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      bestVacancies: [],
      qualifications: [],
      pageSize: defaultPageSize,
      showNavigation: false,
      loading: false,
      tableStatus: tableStatuses.VACANCIES,
    };
  }

  async handleGetBestVacancies(e) {
    this.setState({ loading: true });

    try {
      const { data: vacancies } = await api.getVacancies(e);

      // generate link to vacancy on rabota.ua
      const vacanciesWithDescription = vacancies.map(vacancy => ({
        ...vacancy,
        description: `https://rabota.ua/company${vacancy.companyExternalId}/vacancy${
          vacancy.vacancyId
        }`,
      }));

      const nextState = {
        showNavigation: false,
        bestVacancies: vacanciesWithDescription,
        loading: false,
        tableStatus: tableStatuses.VACANCIES,
        pageSize: vacancies.length <= defaultPageSize ? vacancies.length : defaultPageSize,
      };

      this.setState(nextState);
    } catch (err) {
      console.error(err);
      this.setState({ loading: false, tableStatus: tableStatuses.VACANCIES });
    }
  }

  async handleGetQualifications() {
    this.setState({ loading: true });

    try {
      const { data } = await api.getQualifications();

      this.setState({
        qualifications: data,
        loading: false,
        tableStatus: tableStatuses.QUALIFICATIONS,
        showNavigation: true,
        pageSize: defaultPageSize,
      });
    } catch (err) {
      console.error(err);
      this.setState({
        loading: false,
        tableStatus: tableStatuses.QUALIFICATIONS,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h2 className="App__header">Hi, Test Engineer!</h2>
        <h2 className="App__header">Search for vacancies that match your skills.</h2>
        <Provider store={store}>
          <div>

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
}

export default App;
