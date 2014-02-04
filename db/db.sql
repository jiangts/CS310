create table person (
    id serial primary key, 
    fname varchar(255), 
    mname varchar(255),
    lname varchar(255),
    email varchar(255),
    dob date,
    phone varchar(15),
    gender varchar(1),
    country varchar(255),
    user_type varchar(255)
);

create table property (
    id serial primary key, 
    owner_id integer,
    foreign key (owner_id) references person(id),
    street_nu integer,
    street_name varchar(255),
    street_suffix varchar(255),
    city varchar(255),
    state varchar(2),
    zip varchar(255),
    country varchar(255),
    longitude float,
    latitude float
);

CREATE EXTENSION "uuid-ossp";
create table object (
    id serial primary key, 
    uuid UUID,
    name varchar(255),
    property_id integer,
    owner_id integer,
    foreign key (property_id) references property(id),
    foreign key (owner_id) references person(id), /*denormalize*/
    location_enabled boolean,
    wifi_connected boolean,
    object_type varchar(255)
);

create table thermostat (
    id serial primary key, 
    object_id integer,
    foreign key (object_id) references object(id),
    set_temp float,
    current_temp float /*denormalize*/
);

create table thermostat_history (
    id serial primary key, 
    thermostat_id integer,
    object_id integer,
    foreign key (thermostat_id) references thermostat(id), /*denormalize*/
    foreign key (object_id) references object(id),
    timestamp timestamp,
    set_temp float,
    current_temp float
);

insert into person (fname, lname, mname, email, dob, gender, country, user_type) values 
('Tian-Shun', 'Jiang', 'Allan', 'jiang14t@ncssm.edu', '1996-02-04', 'M', 'USA', 'landlord');


update person set user_type='landlord' where id=1;
update person set phone='919-518-6439' where id=1;

alter table property add column name varchar(255);
insert into property (owner_id, street_nu, street_name, street_suffix, city, state, zip, country, name)
values (1, 264, 'Ocean View', 'Ct', 'Cape Hatteras', 'NC', '27949', 'USA', 'Hatteras Ocean View');


/*alter table property add column image*/

insert into object (uuid, name, property_id, owner_id, object_type) values
('b351e2f0-8521-11e3-baa7-0800200c9a66', 'First Object', 1, 1, 'thermostat');


create table utility (
    id serial primary key, 
    name varchar(255)
);


create table property_utility (
    id serial primary key, 
    utility_id integer,
    property_id integer,
    foreign key (utility_id) references utility(id),
    foreign key (property_id) references property(id),
    utility_state varchar(3) /*on or off*/
);

insert into utility (name) values ('electricity'), ('water');


SELECT property.id, property.name as property_id, person.id as owner_id, COUNT(object.id) as object_num
FROM (property JOIN person ON person.id=property.owner_id and person.id = 1) JOIN Object ON property.id=Object.property_id 
GROUP BY property.id, person.id;

create index owner_id on object using btree(owner_id);
create index property_owner_id on property using btree(owner_id);
create index thermostat_fkidx on thermostat_history using btree(thermostat_id);
create index object_fkidx on thermostat_history using btree(object_id);
create index object_fkidx_thermo on thermostat using btree(object_id);
create index utility_fkidx on property_utility using btree(utility_id);
create index property_fkidx on property_utility using btree(property_id);
create index property_fkidx_obj on object using btree(property_id);
