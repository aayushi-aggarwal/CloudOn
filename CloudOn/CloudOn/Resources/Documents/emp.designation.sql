create database empdb
use empdb


----------------EMPLOYEE DESIGNATION TABLE(MASTER TABLE)--------------------


CREATE TABLE EmployeeDesignation (
    Desg_ID int not null primary key identity(1,1),
    Emp_Designation varchar(15) not null,
    Created_By varchar(30) not null,
    Created_At datetime not null default(GETDATE()),
    Updated_By varchar(30),
    Updated_At datetime,
    IsActive bit default 1,
    IsDeleted bit default 0
)
Go



------------------STORED PROCEDURE TO INSERT----------------------


CREATE PROCEDURE prc_InsertDesg
    @Designation varchar(15),
    @CreatedBy varchar(30)
    
AS
Begin
Set NOCOUNT ON;
INSERT INTO EmployeeDesignation
(Emp_Designation,Created_By)
VALUES
(@Designation,
@CreatedBy
)
end
Go


EXEC prc_InsertDesg @Designation='C1',@CreatedBy='M3'
EXEC prc_InsertDesg @Designation='Intern',@CreatedBy='HR'

GO

------------------------STORED PROCEDURE TO GET-------------------


CREATE PROCEDURE prc_Get_Emp_Desg
@DesignationID int
as
begin
declare @del int
select @del=IsDeleted from EmployeeDesignation where Desg_ID=@DesignationID
end
if @del=0
begin 
begin
SET NOCOUNT ON;
SELECT Emp_Designation,Desg_ID FROM EmployeeDesignation where Desg_ID=@DesignationID
end
begin
declare @qry int
select @qry=IsActive from EmployeeDesignation where Desg_ID=@DesignationID
Select case when @qry=0 then ' Not active'
when @qry=1 then 'Active'
end
end
end
GO
EXEC prc_Get_Emp_Desg @DesignationID=1
Go



----------------------------STORED PROCEDURE TO UPDATE------------------



CREATE PROCEDURE prc_Update_Desg
@DesignationID int,
@Emp_Desg varchar(15),
@UpdatedBy varchar(30),
@UpdatedAt datetime,
@IsActive bit

as
begin
set nocount on;
Update EmployeeDesignation set Emp_Designation=@Emp_Desg,Updated_By=@UpdatedBy,Updated_At=GETDATE(),IsActive=@IsActive where Desg_ID=@DesignationID
end
GO
declare @Updated_At as datetime=getdate()
Exec prc_Update_Desg @Emp_Desg="A2",@UpdatedBy='M2',@UpdatedAt=@Updated_At,@IsActive=1,@DesignationID=1
Go


-------------------------STORED PROCEDURE TO DELETE---------------------



CREATE PROCEDURE prc_deletedesg

@desg_ID int,
@isDeleted bit=0,
@Updated_By varchar=null,
@Updated_At datetime=null

AS
BEGIN
SET NOCOUNT ON;

UPDATE EmployeeDesignation SET isDeleted=@isDeleted,Updated_By=@Updated_By,Updated_At=@Updated_At
WHERE desg_ID = @desg_ID;

END
GO
declare @Updated_At as datetime=getdate()
EXEC prc_deletedesg @desg_ID=1,@isDeleted=1,@Updated_By='User1',@Updated_At=@Updated_At;
