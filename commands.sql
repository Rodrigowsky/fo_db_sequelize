CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
  	likes integer NOT NuLL
);

insert into blogs (author, url, title, likes) values('Dan Abramov','www','On let vs const', 0);

insert into blogs (author, url,title, likes) values('Laurenz Albe','www','Gaps in sequences in PostgreSQL', 0);



