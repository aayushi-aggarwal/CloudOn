create database cloudOn;

use cloudOn;
go

create table users(id int primary key identity(1,1),username varchar(100) not null ,password nvarchar(100) not null, CreatedAt datetime);

create table folders(id int primary key identity(1,1),f_name varchar(100) not null,CreatedBy int foreign key references users(id),CreatedAt datetime,isDeleted bit);

create table documents(doc_id int primary key identity(1,1),d_name varchar(100),content_type varchar(100),size int,CreatedBy int foreign key references users(id),CreatedAt datetime, folder_id int foreign key references folders(id),isDeleted bit);


select * from users;
select * from documents;
select * from folders;

