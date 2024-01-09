export const config  = () =>({
    port : process.env.PORT,
    db_host : process.env.DB_HOST,
    db_user : process.env.DB_USER,
    database : process.env.DATABASE,
    db_password : process.env.DB_PASSWORD
})

// PORT = "3000"
// DB_HOST =  'localhost'
// DB_USER = 'root'
// DATABASE = "mybase"
// DB_PASSWORD = "Dekar123."