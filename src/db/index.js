import mongoose from 'mongoose';

// mongoose.connect(process.env.DB_KEY);
console.log(process.env.DB_KEY);

const db = mongoose.connection;

db.on('connected', () => console.log('Connecting DB Success'));
db.on('error', (err) => console.error('Connecting DB Failed'));

export * from './models/index.js';
