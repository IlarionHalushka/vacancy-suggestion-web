import axios from 'axios';

import { apiPrefix } from '../config/enviroment';

export default {
  getQualifications() {
    return axios({
      url: `${apiPrefix}/qualifications`,
      method: 'GET',
    });
  },

  getVacancies(data) {
    return axios({
      url: `${apiPrefix}/getBestVacancies`,
      method: 'POST',
      data,
    });
  },
};
