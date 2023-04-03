CREATE DATABASE servo

create table stations (
    id serial,
    station_description text,
    station_name text,
    station_owner text,
    station_address text,
    station_suburb text,
    station_state text,
    latitude numeric(10,7),
    longitude numeric(10,7)
);


COPY stations(id, station_description, station_name, station_owner, station_address, station_suburb, station_state, latitude, longitude )
FROM '/Users/Liang/Downloads/stations.csv'
DELIMITER ','
CSV HEADER;


