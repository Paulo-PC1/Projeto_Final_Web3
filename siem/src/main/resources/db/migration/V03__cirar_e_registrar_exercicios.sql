CREATE TABLE exercise (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	statement VARCHAR(255) NOT NULL, 
	operation VARCHAR(150),
	correct_answer DECIMAL(10, 2) NOT NULL,
	active TINYINT(1) NOT NULL,
	category_id BIGINT(20) NOT NULL,
	FOREIGN KEY (category_id) REFERENCES category(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO exercise(statement, operation, correct_answer, active, category_id) VALUES
	("Calcule a operação: ", "3 + 10 / 2 ", 8, 1, 1),
	("Calcule a seguinte operação: ", "100 / 10 * 3, 55", 35.5, 1, 1),
	("Calcule e descubra o valor de X com base na expressão: ", "X + 5 * 2 = 20 ", 10, 1, 2),
	("Calcule e descubra o valor de X: ", "x² + 4 * 10", 65, 1, 2),
	("Calcule e descubra o valor de A dada a expressão: ", "X = 4² + 4, A = X * 10", 200, 1, 2),
	("Calcule e descubra o valor de Z:", "(5 * 3) / 3 = X, (10²) / 5) * 2 = Y, Z = X + Y", 45, 1, 2),
	("Calcule a Area de um qudrado em m² com as seguntes dimensões: 10,5m x 25,5m ", NULL, 215.25, 1, 3),
	("Calcule e descubra o valor de C² com base no Teorema de Pitágoras C² = A² + B² onde B = 3, A = 4", NULL, 5, 1, 3),
	("Calcule a Probabilidade de um Dado de 6 lados cair em um numero par baseado na seguinte formulá: P(A) = Eventos Favoráveis / Total de Resultados Possíveis", NULL, 50.0, 1, 4),
	("Imagine a distancia percorrida por um objeto é dada a função f(x) = x² , onde x é o tempo calcule qual velocidade instantanea(taxa de variação) desse objeto no exato momento que x =3 usando a regra de derivação do Tombo", NULL, 6, 1, 5);