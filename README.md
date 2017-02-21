# UseBike


## nvm (instalar versao do node)

```
nvm install 4.6.2
```

Sempre que for executar o projeto, lembre de setar a versao do node
no diretorio do projeto

```
nvm use 4.6.2
```


## Dependencias

### Instalar dependencias do npm

```
npm install
```

### Instalar dependencias do bower

Pra nao precisar instalar pacotes do node globalmente, as versoes locais
podem ser executadas do diretorio:

```
./node_modules/.bin/bower install
```


## MySQL

```
CREATE USER 'usebike'@'localhost' IDENTIFIED BY 'usebike'; 
```

```
CREATE DATABASE usebike;
```

```
GRANT ALL PRIVILEGES ON usebike.* TO 'usebike'@'localhost';
```


## Rodando o projeto

Na diretorio do projeto, executar:

```
./node_modules/.bin/nodemon app.js
```
O comando acima da start no server e fica observando por mudanças
no codigo, caso algo mude, ele reinicia automaticamente.



Caso esteja trabalhando com o app de admin em angular (/admin), abra outra aba no terminal
e execute:

```
./node_modules/.bin/gulp
```
O comando acima compila todo o codigo angular e fica observando por
mudanças, recompilando sempre que algo mudar.

