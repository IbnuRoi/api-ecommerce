import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { bootstrap } from './src/bootsrap.js';
import { dbConnection } from './Database/dbConnection.js';

dotenv.config()
const app = express();

app.use(cors())
app.use(bodyParser.json())

bootstrap(app)
dbConnection()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});