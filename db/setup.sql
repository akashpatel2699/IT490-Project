CREATE TABLE users (
    username VARCHAR(256),
    password VARCHAR(256) NOT NULL,
    student_id serial NOT NULL UNIQUE,
    first_name VARCHAR(256) NOT NULL,
    last_name VARCHAR(256) NOT NULL,
    PRIMARY KEY(username)
);

INSERT INTO users VALUES ('billy01', 'Highlander1', 10000000, 'Billy', 'Green' );
INSERT INTO users VALUES ('sarah01', 'Highlander1', 10000001, 'Sarah', 'Smith' );
INSERT INTO users VALUES ('tony01', 'Highlander1', 10000002, 'Tony', 'Cruz' );
