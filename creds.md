DATABASE
branch = main
role = admin

username = zodqybx8ja7lmzo2uyxa
password = pscale_pw_Ag7iQu3uS3Bn5BnuAPghs8iMFQsA2zN1iAxsdX5fMnM

env:
DATABASE_URL='mysql://zodqybx8ja7lmzo2uyxa:pscale_pw_Ag7iQu3uS3Bn5BnuAPghs8iMFQsA2zN1iAxsdX5fMnM@aws.connect.psdb.cloud/rss-parser?ssl={"rejectUnauthorized":true}'

app.js
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.end()
