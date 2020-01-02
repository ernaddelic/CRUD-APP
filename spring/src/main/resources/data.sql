INSERT INTO users(first_name,last_name,age) VALUES("Nate", "Murray", 23);
INSERT INTO users(first_name,last_name,age) VALUES("John", "Smith", 27);
INSERT INTO users(first_name,last_name,age) VALUES("Tim", "Handry", 35);
INSERT INTO role(name) VALUES("ROLE_ADMIN");
INSERT INTO role(name) VALUES("ROLE_USER");
INSERT INTO loguser(name, email, password) VALUES("admin", "admin@gmail.com", "$2y$12$bfbf.T7.x6jdLeqjAFGJR.R7thY9/6kj2GPSTnP3a30MGTqdrj6uq");
INSERT INTO loguser_roles(user_id,role_id) VALUES(1,1);