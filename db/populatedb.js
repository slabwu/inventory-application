#! /usr/bin/env node
require('dotenv').config()
const { Client } = require('pg')
const { argv } = require('node:process')

const url = argv[2] || process.env.DATABASE_URL

// TRUNCATE TABLE products RESTART IDENTITY;
// TRUNCATE TABLE categories RESTART IDENTITY;

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 30 )
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 30 ),
  emoji TEXT,
  price DECIMAL(5, 2),
  quantity INTEGER,
  categoryId INTEGER,
  FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO categories (name) 
VALUES
  ('Fruits'),
  ('Vegetables'),
  ('Drinks');

INSERT INTO products (name, emoji, price, quantity, categoryId) 
VALUES
  ('Apple', '🍎', '2.50', 95, 1),
  ('Broccoli', '🥦', '1.40', 192, 2),
  ('Coffee', '☕', '5.40', 22, 3);  
`

async function main() {
  console.log('seeding...')
  const client = new Client({
    connectionString: url,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log('done')
}

main()