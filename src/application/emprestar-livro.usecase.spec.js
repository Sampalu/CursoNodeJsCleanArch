const { Either, AppError } = require('../shared/errors');
const emprestarLivroUseCase = require('./emprestar-livro.usecase');

describe('Emprestar livro UseCase', function () {
  const emprestimosRepository = {
    emprestar: jest.fn(),
    existeLivroISBNEmprestadoPendenteUsuario: jest.fn(),
    buscarEmprestimoComLivroComUsuarioPorID: jest.fn()
  };

  const emailService = {
    enviarEmail: jest.fn()
  };

  test('Deve poder emprestar um livro', async function () {
    emprestimosRepository.emprestar.mockResolvedValue('qualquer_id');
    emprestimosRepository.buscarEmprestimoComLivroComUsuarioPorID.mockResolvedValue({
      usuario: {
        nome: 'qualquer_nome_usuario',
        CPF: 'qualquer_CPF',
        email: 'qualquer_email'
      },
      livro: {
        nome: 'qualquer_nome_livro'
      }
    });
    const emprestarLivroDTO = {
      livro_id: 'qualquer_livro_id',
      usuario_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-16')
    };

    const sut = emprestarLivroUseCase({ emprestimosRepository, emailService });
    const output = await sut(emprestarLivroDTO);

    expect(output.right).toBeNull();
    expect(emprestimosRepository.emprestar).toHaveBeenCalledWith(emprestarLivroDTO);
    expect(emprestimosRepository.emprestar).toHaveBeenCalledTimes(1);
    // expect(emailService.enviarEmail).toHaveBeenCalledWith({
    //   data_saida: emprestarLivroDTO.data_saida,
    //   data_retorno: emprestarLivroDTO.data_retorno,
    //   nome_usuario: 'qualquer_nome_usuario',
    //   CPF: 'qualquer_CPF',
    //   email: 'qualquer_email',
    //   nome_livro: 'qualquer_nome_livro'
    // });
  });

  test('Deve retornar um Either.left se a data de retorno for menor que a data de saída', async function () {
    const emprestarLivroDTO = {
      livro_id: 'qualquer_livro_id',
      usuario_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-15')
    };

    const sut = emprestarLivroUseCase({ emprestimosRepository, emailService });
    const output = await sut(emprestarLivroDTO);

    expect(output.left).toBe(Either.dataRetornoMenorQueDataSaida);
  });

  test('Não deve permitir o empréstimo de um livro com o mesmo ISBN para o mesmo usuário antes que o livro anterior tenha sido devolvido', async function () {
    emprestimosRepository.existeLivroISBNEmprestadoPendenteUsuario.mockResolvedValue(true);
    const emprestarLivroDTO = {
      livro_id: 'qualquer_livro_id',
      usuario_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-16')
    };

    const sut = emprestarLivroUseCase({ emprestimosRepository, emailService });
    const output = await sut(emprestarLivroDTO);

    expect(output.left).toBe(Either.livroComISBNJaEmprestadoPendenteUsuario);
    expect(emprestimosRepository.existeLivroISBNEmprestadoPendenteUsuario).toHaveBeenCalledWith({
      livro_id: emprestarLivroDTO.livro_id,
      usuario_id: emprestarLivroDTO.usuario_id
    });
    expect(emprestimosRepository.existeLivroISBNEmprestadoPendenteUsuario).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppErrpor se o emprestimosRepository não for fornecido', function () {
    expect(() => emprestarLivroUseCase({})).toThrow(new AppError(AppError.dependencias));
  });

  test('Deve retornar um throw AppError se algum campo obrigatório não for fornecido', async function () {
    const sut = emprestarLivroUseCase({ emprestimosRepository, emailService });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes)
    );
  });
});