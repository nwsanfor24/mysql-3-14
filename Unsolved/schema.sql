DROP DATABASE IF EXISTS topsongs_DB;
CREATE DATABASE topsongs_DB;

USE topsongs_DB;

CREATE TABLE Top5000(
    id INT NOT NULL AUTO_INCREMENT,
    artist VARCHAR(100) NOT NULL,
    song VARCHAR(100) NOT NULL,
    song_year INT default 0,
    raw_total INT default 0,
    raw_usa INT DEFAULT 0,
    raw_uk INT DEFAULT 0,
    raw_eur INT DEFAULT 0,
    raw_row INT DEFAULT 0,
    PRIMARY KEY (id)
);