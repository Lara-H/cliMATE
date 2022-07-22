# Before the first start
You will need to get all the npm packages before launching the application. This can be achieved by executing 
```npm install```

# Starting the development server
For starting the development server, you can use the default start script, which is supplied by react, by executing 
```npm run start```

# Running Tests
This project has several E2E-Tests written for Cypress (https://www.cypress.io/). The Test-executor can be launched via the custom npm-script 
```npm run cy:open```
, which will open a Cypress-Window, through which tests can be controlled.
You can either run every test by itself, or every test successively by opening the 
```main.cy.ts```
file through cypress.