CREATE TABLE users(
    username text primary key,
    email text unique not null,
    password text not null,
    name text,
    lastname text,
    address text,
    city text,
    country text,
    phone integer,
    token text,
    verification_token text,
    verified integer,
    btc real,
    eth real,
    usdt real, 
    bnb real,
    usdc real, 
    sol real,
    ada real,
    link real,
    matic real, 
    dot real
);

CREATE TABLE transactions(
    transaction_id integer primary key,
    username text not null,
    date integer,
    coin text not null,
    quantity real not null,
    price real
);

CREATE TABLE prices(
    date integer primary key,
    btc real,
    eth real,
    usdt real,
    bnb real,
    usdc real, 
    sol real, 
    ada real,
    link real,
    matic real,
    dot real
);
