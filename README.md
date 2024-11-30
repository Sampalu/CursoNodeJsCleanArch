# CursoNodeJsCleanArch

## Instalar jest

```
npm i -D jest
```

#### Documentação
> https://jestjs.io/

<br>

## Inicializar o jest - inicia binarios

```
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

## Instalando os tipos para autocomplete

```
npm i -D @types/jest
```

## Executando os testes

```
npm test
```
