const bodyParser = require("body-parser");
const express = require("express");
const saudacao = require("./saudacaoMid");
// const usuarioApi = require('./api/usuario')
const app = express();
require('./api/produto')(app, ' com param!')

// app.post('/usuario', usuarioApi.salvar)
// app.get('/usuario', usuarioApi.obter)

//BODY PARSER
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//MIDLLEWARE EXTERNO
app.use(saudacao("Guilherme"));

//MIDLLEWARE (NEXT)
app.use((req, res, next) => {
  console.log("Antes...");
  next();
});

//UTILIZANDO QUERRY
app.get("/clientes/relatorio", (req, res) => {
  res.send(
    `Clients relatório: completo = ${req.query.completo}, ano = ${req.query.ano}`
  );
});

//UTILIZAÇÃO DO BODYPARSER
app.post("/corpo", (req, res) => {
  res.send(req.body);
});

//UTILIZANDO PARAMS
app.get("/clientes/:id", (req, res) => {
  res.send(`Cliente ${req.params.id} selecionado!`);
});

app.get("/ping", (req, res, next) => {
  console.log("Durante...");
  res.status(200).json({
    data: [
      {
        id: 7,
        name: "Ana",
        position: 1,
      },
      {
        id: 35,
        name: "Debora",
        position: 2,
      },
      {
        id: 16,
        name: "Bianca",
        position: 3,
      },
    ],
    count: 30,
    skip: 0,
    limit: 3,
    status: 200,
  });
  next();
});

app.use((req, res) => {
  console.log("Depois...");
});

app.listen(3000, function () {
  console.log("Back-end server listening on port");
});
