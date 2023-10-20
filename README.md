# calculator-manager-app

This project has as objective to provide a simple frontend for `calculator-manager-api` repository. This project was developed with JavaScript, React and Reactstrap. The focus was not on the UI: as long as you run it, you will see how simple it is. Despite, the focus was on the separation of concerns wherever it was possible.

## Usage

In order to run the application, you neeed to have installed Docker along with Docker Compose. Once you make sure they are installed, run the following commands:

```sh
git clone git@github.com:monteiroflavio/calculator-manager-app.git
cd calculator-manager-app
cp .env.example .env.development.local
docker compose up --build
```

and it will be available at `127.0.0.1:3000`. In order to be able to use the webpage properly, `calculator-manager-api` also must be running. This project and `calculatr-manager-api` are both running in Docker. So, in order to test locally, API address is set to Docker's gateway `172.17.0.1`. This can be improved when ready to production.

In order to login web page, use the following user:

```json
{ 
    "username": "foo@bar.com",
    "password": "someEncryptedPassword"
}
```