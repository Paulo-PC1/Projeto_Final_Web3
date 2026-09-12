CREATE TABLE category (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	category_name VARCHAR(150) NOT NULL,
	description VARCHAR(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO category (id, category_name, description) VALUES
	(1, "Aritimetica Básica", "Desenvolve as habilidades fundamentais de cálculo e raciocínio numérico, servindo como base para todas as demais áreas da matemática."),
	(2, "Álgebra e Funções", "Ensina a representar problemas usando símbolos, equações e funções, permitindo modelar e resolver situações do mundo real."),
	(3, "Geometria e Trigonometria", "Estuda formas, medidas, posições e relações espaciais, além das relações entre ângulos e lados de figuras geométricas."),
	(4, "Probabilidade e Estatística", "Analisa dados e eventos aleatórios para identificar padrões, fazer previsões e apoiar a tomada de decisões."),
	(5, "Matemática Avançada", "Explora conceitos abstratos e técnicas mais sofisticadas utilizadas em áreas como ciência, engenharia, computação, economia e pesquisa acadêmica.");