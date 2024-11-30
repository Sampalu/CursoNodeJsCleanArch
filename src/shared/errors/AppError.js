module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  static dependencias = 'Alguma dependência obrigatória nao foi fornecida';
  static parametrosObrigatoriosAusentes = 'Algum parâmetro obrigatório não foi fornecido';
}