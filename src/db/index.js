import mongoose from 'mongoose';

// mongoose.connect('db url');

const db = mongoose.connection;

db.on('connected', () => console.log('Connecting DB Success'));
db.on('error', (err) => console.err('Connecting DB Failed'));

export * from './models';
