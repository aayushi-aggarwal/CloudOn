create database empdb
use empdb



---------------------EMPLOYEE INFORMATION TABLE---------------------



CREATE TABLE EmpInfo (
    Emp_ID int not null primary key identity(1,1),
    FirstName varchar(30) not null,
    MiddleName varchar(30),
    LastName varchar(30),
    DOB date not null,
    Age int,
    PhoneNumber varchar(12),
    MobileNumber bigint not null,
    Email varchar(319) not null unique,
    CreatedBy varchar(30) not null,
    CreatedAt datetime not null default(GETDATE()),
    UpdatedBy varchar(30),
    UpdatedAt datetime,
    IsActive bit default 1,
    IsDeleted bit default 0,
    Desg_ID int not null,
    foreign key (Desg_ID) references EmployeeDesignation(Desg_ID)
)
Go




------------------------ STORED PROCEDURE TO INSERT-------------------------------



CREATE PROCEDURE prc_InsertEmployee
@FirstName varchar(30),
@MiddleName varchar(30)=null,
@LastName varchar(30)=null,
@Date_Of_Birth date,
@Age int=null,
@Phone_Number varchar(12)=null,
@Mobile_Number bigint,
@Email varchar(319),
@CreatedBy varchar(30),
@DesignationID int
AS
Begin
Set NOCOUNT ON;
INSERT EmpInfo
(FirstName, MiddleName, LastName,DOB,Age, PhoneNumber, MobileNumber, Email, CreatedBy,Desg_ID)
VALUES
(@FirstName,@MiddleName,@LastName,@Date_Of_Birth, @Age,@Phone_Number,@Mobile_Number,@Email,@CreatedBy,
@DesignationID)
end
Go

EXEC prc_InsertEmployee @FirstName='KUNAL',
@LastName='CHHABRA',
@age=20,
@Date_Of_Birth='2001-12-09',
@Mobile_Number=1234009086,
@Email='KC@gmail.com',
@CreatedBy='KUNAL',
@DesignationID = 1;
Go

--------------------------------------- STORED PROCEDURE TO FETCH-----------------------------




create procedure prc_GetEmployee
@emp_id int
as
begin
declare @del int
select @del=IsDeleted from EmpInfo where Emp_id=@emp_id
end
if @del=0
begin
begin
Set NOCOUNT ON;
select @emp_id,FirstName,MiddleName,LastName,age,DOB,PhoneNumber,
MobileNumber,Email from EmpInfo where Emp_id=@emp_id
end
begin
declare @qry int
select @qry=IsActive from EmpInfo where Emp_id=@emp_id
Select case when @qry=0 then 'Active'
when @qry=1 then ' Active'
end
end
end
Go
EXEC prc_GetEmployee @emp_id=1
Go




-----------------------------STORED PROCEDURE TO UPDATE---------------------



CREATE PROCEDURE prc_UpdateEmployee
@EmployeeID int,
@Mobile_Number bigint,
@UpdatedBy varchar(30),
@UpdatedAt datetime,
@IsActive bit
As
begin
Set NOCOUNT ON;
Update EmpInfo SET MobileNumber = @Mobile_Number,UpdatedBy=@UpdatedBy,UpdatedAt=GETDATE(),IsActive=@IsActive where Emp_ID=@EmployeeID
end
Go
declare @Emp_Updated_At as datetime=getdate()
EXEC prc_UpdateEmployee @Mobile_Number=9999999999,@UpdatedBy='KUNAL',@UpdatedAt=@Emp_Updated_At,@IsActive=1,@EmployeeID=1
Go



--------------------STORED PROCEDURE TO DELETE------------------------------------


CREATE PROCEDURE prc_deleteEmployeedetails



@emp_ID int,
@isDeleted bit=0,
@Updated_By varchar=null,
@Updated_At datetime=null

AS
BEGIN
SET NOCOUNT ON;

UPDATE EmpInfo SET isDeleted=@isDeleted,UpdatedBy=@Updated_By,UpdatedAt=@Updated_At
WHERE Emp_ID = @emp_ID;



END
GO
declare @Updated_At as datetime=getdate()
EXEC prc_deleteEmployeedetails @emp_ID=1,@isDeleted=1,@Updated_By='KUNAL',@Updated_At=@Updated_At;