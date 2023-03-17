function saudacao(nome) {
  return function (res, req, next) {
    console.log("Seja bem vindo", nome);
    next();
  };
}
module.exports = saudacao;
