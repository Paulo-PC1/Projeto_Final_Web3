CREATE TABLE permission(
    id BIGINT(20) PRIMARY KEY,
    description VARCHAR(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE user_permission(
    id_user BIGINT(20) NOT NULL,
    id_permission BIGINT(20) NOT NULL,
    PRIMARY KEY(id_user,id_permission),
    FOREIGN KEY(id_user) REFERENCES user(id),
    FOREIGN KEY(id_permission) REFERENCES permission(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO user (id, name, email, password, active) VALUES
	(6,'Administrador','admin@email.com.br','$2a$12$5ulU2/p6M83o86yjOYfySO517gs2SJsXn39R4TGNrUXCtXx7iN2gO', 1);

INSERT INTO permission (id, description) VALUES 
	(1,'ROLE_REGISTER_USER'),
	(2,'ROLE_SEARCH_USER'),
	(3,'ROLE_REMOVE_USER');
	
INSERT INTO permission (id, description) VALUES 
	(4,'ROLE_REGISTER_CATEGORY'),
	(5,'ROLE_SEARCH_CATEGORY'),
	(6,'ROLE_REMOVE_CATEGORY');

INSERT INTO permission (id, description) VALUES 
	(7,'ROLE_REGISTER_EXERCISE'),
	(8,'ROLE_SEARCH_EXERCISE'),
	(9,'ROLE_REMOVE_EXERCISE');
	
INSERT INTO permission (id, description) VALUES 
	(10,'ROLE_REGISTER_ANSWER'),
	(11,'ROLE_SEARCH_ANSWER'),
	(12,'ROLE_REMOVE_ANSWER');

-- admin
INSERT INTO user_permission (id_user, id_permission) VALUES
	(6, 1),
	(6, 2),
	(6, 3),
	(6, 4),
	(6, 5),
	(6, 6),
	(6, 7),
	(6, 8),
	(6, 9),
	(6, 10),
	(6, 11),
	(6, 12);

-- users
INSERT INTO user_permission (id_user, id_permission) VALUES
	(1, 5), 
	(1, 8),
	(1, 10),
	(1, 11),
	(1, 12);
	
INSERT INTO user_permission (id_user, id_permission) VALUES
	(2, 5), 
	(2, 8),
	(2, 10),
	(2, 11),
	(2, 12);
	
INSERT INTO user_permission (id_user, id_permission) VALUES
	(3, 5), 
	(3, 8),
	(3, 10),
	(3, 11),
	(3, 12);
	
INSERT INTO user_permission (id_user, id_permission) VALUES
	(4, 5), 
	(4, 8),
	(4, 10),
	(4, 11),
	(4, 12);
	
INSERT INTO user_permission (id_user, id_permission) VALUES
	(5, 5), 
	(5, 8),
	(5, 10),
	(5, 11),
	(5, 12);
	