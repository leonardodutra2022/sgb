create table bairro
(
  id     int auto_increment
    primary key,
  codigo char(10)     not null,
  nome   varchar(255) not null,
  cidade varchar(255) null,
  uf     char(2)      not null
)
  engine = INNODB;

create table banco
(
  id         bigint auto_increment
    primary key,
  cod_banco  varchar(50)  null,
  nome_banco varchar(200) null
)
  engine = INNODB
  charset = utf8;

create table cidade
(
  id   bigint auto_increment
    primary key,
  nome varchar(200) null,
  uf   varchar(10)  null
)
  engine = INNODB
  charset = utf8;

create table orgao_expedidor
(
  id        bigint auto_increment
    primary key,
  sigla     varchar(20)  null,
  descricao varchar(255) null
)
  engine = INNODB
  charset = utf8;

create table estado
(
  id    bigint auto_increment
    primary key,
  sigla varchar(10)  null,
  nome  varchar(100) null
)
  engine = INNODB
  charset = utf8;

create table logradouro_tipo
(
  id          bigint auto_increment
    primary key,
  descricao   varchar(100) null,
  abreviatura varchar(10)  null
)
  engine = INNODB
  charset = utf8;