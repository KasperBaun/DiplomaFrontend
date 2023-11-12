
### Requirements
- EntityFramework Core installed as a CLI tool.

**Commands for Windows terminal**
```bash
dotnet tool install --global dotnet-ef
```


## Guide
1. Create a user and MySQL database and save the username + password.
```mysql
CREATE USER 'dbadmin'@'%' IDENTIFIED BY '100%Kaffe!';
CREATE DATABASE groenlund;
GRANT ALL PRIVILEGES ON groenlund.* TO 'dbadmin'@'%';
FLUSH PRIVILEGES;
```

2. Clone the backend [repository](https://github.com/simonsoeborg/DiplomaProject)
3. Open a command prompt in the root and create a system variable with the connection string to the database by running the following code. Replace the values with your actual details.

```bash
setx GroenlundDBConnection "Server=89.150.142.89;Database=groenlund;User=dbadmin;Password=100%Kaffe!;"
```
**Important** - Close the command prompt after creating the system variable.

5. Open a new command prompt and cd to the "ClassLibrary" project. 
```shell
cd .\ClassLibrary\
```

*If the FreshInstall migration is allready in the Migrations folder, step 6 can be skipped.*
6. Create a new migration by running:
```shell
dotnet ef migrations add FreshInstall   
``` 
*Replace "InitialCreate" with the name you wish to give to your migration. This command will apply the migration to the database, creating the schema as defined in your EF Core model.*

7. Apply the migration to the database with:
```shell
dotnet ef database update
```


