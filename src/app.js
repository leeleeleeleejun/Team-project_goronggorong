import express from 'express';
import dotenv from 'dotenv';
// import morgan from 'morgan';

// import { httpLogStream } from './utils/index.js';
import * as db from './db/index.js';

// process.env에 설정한 환경변수 추가
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('root');
});

// app.use(morgan('dev', { stream: httpLogStream }));

app.listen(port, () => {
  console.log(`Connected to ${port}...`);
});
