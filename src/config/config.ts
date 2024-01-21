export const config  = () =>({
    port : process.env.PORT,
    db_host : process.env.DB_HOST,
    db_user : process.env.DB_USER,
    database : process.env.DATABASE,
    db_password : process.env.DB_PASSWORD,
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})


