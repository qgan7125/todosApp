# Build a simple full stack todos app 
- Front end: React
- Back end: ExpressJS, NodeJS
- Database: MySQL
- (NEW) Add Java spring boot server
- (Update) use sequelize ORM for expressJS

## Configuration for express server
Please modify database information in [db.config.js]("./../NodeJS_Server/config/db.config.js").

`.env` example
```
DB_HOST="localhost"
DB_USER="your_db_user"
DB_PASSWORD="your_db_password"
DB_NAME="your_database_name"
DB_DIALECT="your_database_driver"
```

## Configuration for Java spring boot server
Please set up application environment variables before use.
```
db_url="your database url"
db_username="your database username"
db_password="your database password"
```

## Start server 
```
// ExpressJs
npm run devServer
```

For spring boot,

Please run TodoApplication.java


## Start front end web
```
npm start
```