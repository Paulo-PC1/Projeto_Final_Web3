# SIEM - Sistema Inteligente de Exercícios Matemáticos

## 📚 Projeto Final – Desenvolvimento Web II

API REST desenvolvida como projeto final da disciplina **Desenvolvimento Web II (CJOWEB2)** do **Instituto Federal de São Paulo (IFSP)**.

O **SIEM (Sistema Inteligente de Exercícios Matemáticos)** tem como objetivo oferecer uma plataforma para gerenciamento de exercícios matemáticos, permitindo o cadastro de usuários, organização dos exercícios por categorias e o registro das respostas dos estudantes.

O projeto foi desenvolvido utilizando os principais conceitos abordados durante a disciplina, incluindo arquitetura REST, persistência de dados, validação de informações e mecanismos de autenticação e autorização.

---

## 🎯 Objetivos

* Disponibilizar uma API REST para gerenciamento de exercícios matemáticos;
* Permitir o cadastro e autenticação de usuários;
* Organizar exercícios em categorias;
* Registrar as respostas enviadas pelos usuários;
* Aplicar conceitos de segurança utilizando autenticação JWT.

---

## 🛠 Tecnologias Utilizadas

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT (JSON Web Token)
* OAuth2 Resource Server
* Flyway
* MySQL
* Maven
* Swagger / OpenAPI

---

## 📂 Arquitetura

O projeto foi desenvolvido seguindo a arquitetura em camadas:

```text
Controller
│
├── Service
│
├── Repository
│
├── Domain (Model)
│
├── Security
│
├── Config
│
└── Exception Handler
```

---

## 🔐 Segurança

A aplicação utiliza:

* Spring Security;
* Autenticação baseada em JWT;
* Controle de acesso por usuários autenticados;
* Autorização através de permissões.

---

## ✅ Requisitos Atendidos

O projeto contempla os requisitos definidos para o Projeto Final da disciplina:

* API seguindo o padrão REST;
* Persistência em banco de dados relacional utilizando ORM (JPA/Hibernate);
* Validação dos dados recebidos pela API;
* Autenticação e autorização de usuários;
* Versionamento utilizando Git e GitHub.

---

## 🗄 Banco de Dados

O banco de dados utilizado é o **MySQL**.

A estrutura do banco é criada automaticamente através das migrations do **Flyway**.

Configure as credenciais da aplicação antes da execução.

---

## ▶️ Como Executar

### Clone o repositório

```bash
git clone https://github.com/Paulo-PC1/FinalProjectWEB2.git
```

### Configure o banco de dados MySQL

Crie um banco de dados e ajuste as configurações de conexão no arquivo de propriedades da aplicação ou por meio de variáveis de ambiente.

### Execute o projeto

Pelo Maven:

```bash
./mvnw spring-boot:run
```

Ou execute a classe principal da aplicação pela IDE (IntelliJ IDEA ou Eclipse).

---

## 📖 Documentação da API

Após iniciar a aplicação, a documentação pode ser acessada pelo Swagger:

```
http://localhost:8080/swagger-ui/index.html
```

---

## 📌 Principais Funcionalidades

* Cadastro de usuários;
* Login com autenticação JWT;
* Gerenciamento de categorias;
* Cadastro de exercícios matemáticos;
* Registro de respostas dos usuários;
* Operações completas de CRUD;
* Validação de dados;
* Documentação automática da API.

---

## 👨‍🎓 Disciplina

**Desenvolvimento Web II (CJOWEB2)**

Instituto Federal de Educação, Ciência e Tecnologia de São Paulo (IFSP)

Professor: **Fernando Vieira Duarte**

---

## 👨‍💻 Autor

**Paulo Cezar**

Projeto desenvolvido como requisito para conclusão da disciplina **Desenvolvimento Web II**.
