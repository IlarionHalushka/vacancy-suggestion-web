import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { serverPort } from './config/enviroment';

import getBestVacancies from "./controllers/chooseBestVacanciesForCandidate";

const app = express();

app.use( bodyParser.json() );
app.use(cors({ origin: '*' }));

app.post('/getBestVacancies', async (req, res) => {
  console.log(req.body.data);
  //const response = await getBestVacancies(req.body.data);

  //res.send(200, response);
  res.send(200).json({request: 'success'});
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});