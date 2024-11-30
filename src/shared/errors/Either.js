/**
 * @description: ATENÇÃO, esta classe não deve ser instânciada diretamente, use um dos métodos Left ou Right
 * EITHER é um conceito na progração funcional que permite lidar com situações onde o resultado pode ser
 * de dois tipos diferentes: Left ou Right. É uma maneira de representar escolhas ou resultado 
 * bem-sucedidos/falhos de forma explícita.
 * É possível tratar cada tipo de resultado de maneira distinta, oferecendo mais controle sobre o fluxo do
 * programa e evitando exeções inesperadas. 
 * Essa abordagem proporciona uma maneira simples e eficaz de lidar com diferentes cenários na programação
 * funcional
 */
module.exports = class Either {
    constructor(left, right) {
      this.left = left;
      this.right = right;
    }
  
    // Geralmente associada a falhas ou erros
    static Left(left) {
      return new Either(left, null);
    }
  
    // Associado a resultados bem-sucedidos
    static Right(right) {
      return new Either(null, right);
    }
  
    static valorJaCadastrado(valor) {
      return { message: `${valor} já cadastrado.` };
    }
  
    fold(leftFn, rightFn) {
      return this.left !== null ? leftFn(this.left) : rightFn(this.right);
    }
  
    static dataRetornoMenorQueDataSaida = {
      message: 'Data de retorno menor que a data de saída'
    };
  
    static livroComISBNJaEmprestadoPendenteUsuario = {
      message: 'Livro com ISBN já emprestado ao usuário e ainda não devolvido'
    };
  };