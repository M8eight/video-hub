CREATE TABLE video (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  description VARCHAR(500),
  views int
);

INSERT INTO video VALUES (1, 'Milk', "descripta", 0);
INSERT INTO video VALUES (2, 'Pineapples', "descripta", 0);
INSERT INTO video VALUES (3, 'Apple iPhone 15', "descripta", 0);


UPDATE video SET views = (views + 1) WHERE id = 1;
SELECT views FROM video WHERE id = 1 FOR UPDATE;

