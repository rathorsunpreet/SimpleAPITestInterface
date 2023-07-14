  # Note: This project is no longer under active development.

  # Simple API Test Interface

  Simple API Test Interface is an API Test Interface which uses command-line arguments supplied during the execution to perform certain actions.

  This interface allows users:
  - to create multiple test suites or singular test cases
  - execution of all test suites or a single suite
  - report generation of the executed suite(s)

  The API used in this project is [Reqres.in](https://reqres.in/).
  
  Demo/Usage/Installation: https://www.youtube.com/watch?v=4jL9hjtmDRA

  ## Installation

  Download the package from [Github](https://github.com/rathorsunpreet/SimpleAPITestInterface) and unzip it.

  ```console
  # Installs dependencies
  npm install

  # If the above does not work, then
  npm install --only=dev
  ```

  ## Usage

  ```node
  # To view the help message
  npm run test help

  # To view the list of available suites
  npm run test list

  # To execute test suite(s)
  npm run test users registration

  # To generate HTML report
  npm run test users report registration
  ```

  ## License

  [MIT](https://choosealicense.com/licenses/mit/)
