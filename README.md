## Vacancies-Suggestions Front-end part of application
Front-end: https://vacancies-219107.appspot.com/    (deployed using Google Cloud App Engine)

Back-end: send POST https://vacancies-suggestions-219018.appspot.com/getBestVacancies  

It is a client-server web application that suggests the optimal vacancies for Test Engineers based on the skills provided in search. 

Used Information Retrieval  –  parsing information from jobs website.

Used Data Mining – finding the patterns of how the information is structured.

**Technologies used:**

JavaScript, React, Webpack, ESlint, Prettier, Babel

**To install dependencies:**
```
$npm install
```

**To run server:**
```
$mongod
$npm run build-web
$npm run start
```

Web application will be available on localhost:8080 and it will send requests to back-end: https://vacancies-suggestions-219018.appspot.com/getBestVacancies
