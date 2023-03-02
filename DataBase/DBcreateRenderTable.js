const {client} = require('./connectToDB')

const sql = `
CREATE TABLE IF NOT EXISTS cart
(
  id serial NOT NULL PRIMARY KEY,
  user_id integer NOT NULL,
  product_id integer NOT NULL,
  quantity integer NOT NULL
);

CREATE TABLE IF NOT EXISTS favorites
(
  id serial NOT NULL PRIMARY KEY,
  user_id integer NOT NULL,
  product_id integer NOT NULL
);

CREATE TABLE IF NOT EXISTS order_products
(
  order_id integer NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL
);

CREATE TABLE IF NOT EXISTS orders
(
  order_id serial NOT NULL PRIMARY KEY,
  user_id bigint NOT NULL,
  status character varying(255) NOT NULL,
  total_cost numeric(10,2) NOT NULL DEFAULT '0.00',
  date text NOT NULL,
  adress text NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS products
(
  id serial NOT NULL PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  count integer NOT NULL,
  description text,
  image_url text,
  rating numeric,
  count_reviews integer
);

CREATE TABLE IF NOT EXISTS reviews
(
  id serial NOT NULL PRIMARY KEY,
  product_id integer REFERENCES products(id) ON DELETE CASCADE,
  rating integer,
  text text,
  "time" timestamp without time zone,
  author character varying(255)
);

CREATE TABLE IF NOT EXISTS users
(
  username text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  datacreate timestamp without time zone NOT NULL,
  id serial NOT NULL PRIMARY KEY,
  phone text
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_email
  ON users (email);
`
function createDBTable (){
    return client.query(sql)
    .then(res => {return true})
    .catch(e => {return console.log(e)})
}


module.exports = {
    createDBTable
}