CREATE TABLE user (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(150) NOT NULL,
	active TINYINT(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (id, name, email, password, active) values
	(1, "Paulo Cezar", "paulocezar@email.com", "$2a$12$L5lLH18kwjPvMfaLRW1Tne4rRLU2kUGMcfxY5TPahzahSynbryBfa", 1),
	(2, "José Henrique", "henriquejose@email.com", "$2a$12$L5lLH18kwjPvMfaLRW1Tne4rRLU2kUGMcfxY5TPahzahSynbryBfa", 1),
	(3, "Ana Maria", "mariaana@email.com", "$2a$12$L5lLH18kwjPvMfaLRW1Tne4rRLU2kUGMcfxY5TPahzahSynbryBfa", 1),
	(4, "Maria Laura", "lauramaria@email.com", "$2a$12$L5lLH18kwjPvMfaLRW1Tne4rRLU2kUGMcfxY5TPahzahSynbryBfa", 1),
	(5, "Claudio", "claudio@email.com", "$2a$12$L5lLH18kwjPvMfaLRW1Tne4rRLU2kUGMcfxY5TPahzahSynbryBfa", 1);