INSERT INTO member
    (email, name, password, created_at, updated_at, status)
VALUES ('a@a.com', 'Mr.A', '$2a$10$n32EL8n2AN/L40gbWMl3AOIyQNmXXNcaeqyBFrKnN50itVQNt91DW', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, 'ACTIVATED'),
       ('b@b.com', 'Mr.B', '$2a$10$n32EL8n2AN/L40gbWMl3AOIyQNmXXNcaeqyBFrKnN50itVQNt91DW', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, 'ACTIVATED'),
       ('c@c.com', 'Mr.C', '$2a$10$n32EL8n2AN/L40gbWMl3AOIyQNmXXNcaeqyBFrKnN50itVQNt91DW', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, 'ACTIVATED');


INSERT INTO role(name, created_at, updated_at)
VALUES ('Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Owner', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO user_role(user_id, role_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);