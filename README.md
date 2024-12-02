# CursoNodeJsCleanArch

## 1. Instalar jest

```bash
npm i -D jest
```

### Documentação
> https://jestjs.io/

<br>

### Inicializar o jest - inicia binarios

```bash
npx jest --init
```

#### Perguntas da instalação

1. Incluir configuração no package.json? **Sim**
2. Gostaria de adicionar TypeScript? **Não**
3. Escolha o ambiente de testes. **Node**
4. Gostaria de adicionar coverage reports? **Sim**
5. Qual provider. **v8**
6. Limpar Mocks automaticamente? **Sim**

#### Alterações no arquivo jest.config.js

```js
verbose: true
```

### Instalando os tipos para autocomplete

```bash
npm i -D @types/jest
```

### Executando os testes

```bash
npm test
```
## 2. Instalar SQLite

```bash
npm i -D sqlite3@5
```

## 3. Instalar TypeORM

> https://typeorm.io/

```bash
npm i -D sqlite3@5
```

#### Alterações no arquivo jest.config.js

```js
setupFilesAfterEnv: ['<rootDir>/src/infra/db/typeorm/setup.jest.js']
```


## 99. Outro Assunto

# Links Uteis
> https://github.com/simov/markdown-syntax/blob/main/syntax.md <br>
> https://github.com/simov/markdown-syntax/blob/main/elements.md <br>
> https://github.com/simov/markdown-syntax/blob/main/prism.md