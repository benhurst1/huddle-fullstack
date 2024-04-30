-- Create a new database
CREATE DATABASE huddle;

-- Create the house table
CREATE TABLE house (
  id SERIAL PRIMARY KEY,
  house_number INT NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  postcode VARCHAR(20) NOT NULL,
UNIQUE (house_number, street_address, city, postcode)
);

-- Create the meterReading table
CREATE TABLE meterreading (
  id SERIAL PRIMARY KEY,
  houseid INT REFERENCES house(id),
  metertype VARCHAR(50) NOT NULL,
  readingvalue INT NOT NULL,
  date DATE NOT NULL
);

-- Insert data into the house table
INSERT INTO house (house_number, street_address, city, postcode) VALUES
(123, 'Baker Street', 'London', 'NW1 6XE'),
(456, 'Fleet Street', 'London', 'EC4A 2DY'),
(789, 'High Street', 'Manchester', 'M4 1HQ');

-- Insert data into the meterReading table
INSERT INTO meterreading (houseid, metertype, readingvalue, date) VALUES
(1, 'Electricity', 500, '2024-03-25'),
(1, 'Gas', 300, '2024-03-26'),
(2, 'Electricity', 600, '2024-03-27'),
(2, 'Gas', 400, '2024-03-28'),
(3, 'Electricity', 700, '2024-03-29'),
(3, 'Gas', 500, '2024-03-30');