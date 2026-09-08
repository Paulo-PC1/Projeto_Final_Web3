CREATE TABLE user_answer (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	user_answer DECIMAL(10, 2) NOT NULL,
	correct TINYINT(1) NOT NULL,
	user_id BIGINT(20) NOT NULL,
	exercise_id BIGINT(20) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(id),
	FOREIGN KEY (exercise_id) REFERENCES exercise(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user_answer (user_answer, correct, user_id, exercise_id) VALUES 
	(6, 1, 1, 10),
	(50.0, 1, 2, 9),
	(5.9, 0, 3, 8),
	(100, 0, 4, 4),
	(8, 1, 5, 1);