export const config  = () =>({
    port : process.env.PORT,
    db_host : process.env.DB_HOST,
    db_user : process.env.DB_USER,
    database : process.env.DATABASE,
    db_password : process.env.DB_PASSWORD
})

