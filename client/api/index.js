import axios from "axios";

import { apiPrefix } from "../config/enviroment";

export default {
  getQualifications() {
    return axios({
      url: `${apiPrefix}/qualifications`,
      method: "GET"
    });
  },

  getVacancies(e) {
    return axios({
      url: `${apiPrefix}/getBestVacancies`,
      method: "POST",
      data: { data: e }
    });
  }
};
