/* PACKAGE */
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';

/* MODULE */
import { httpLogStream } from './utils/index.js';
import { signupRouter } from './routers/index.js';
import { productRouter } from './routers/index.js';
import { errorHandler } from './middlewares/index.js';

const app = express();

/* ENV */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

process.chdir(rootDir);
dotenv.config();

const port = process.env.PORT || 3000;

/* DB */
mongoose.connect(process.env.DB_KEY);
const db = mongoose.connection;

db.on('connected', () => console.log('Connecting DB Success'));
db.on('error', (err) => console.error('Connecting DB Failed'));

/* MIDDLEWARE */
// app.set(views)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); // public 폴더 접근
// app.use(morgan('dev', { stream: httpLogStream })); // Log 생성기

/* ROUTER */
app.get('/', (req, res) => {
  res.send('root');
});
app.use('/signup', signupRouter);
app.use('/api', productRouter); // 서버와 클라이언트 라우팅 구분
app.use(errorHandler);

// 순서 중요 (errorHandler는 다른 일반 라우팅 다음에 와야 next로 잘 받아줌)
app.use(errorHandler);

// public 폴더 접근
app.use(express.static('public'));

// Log 생성기
// app.use(morgan('dev', { stream: httpLogStream }));

app.listen(port, () => {
  console.log(`Connected to ${port}...`);
});

export default app;
