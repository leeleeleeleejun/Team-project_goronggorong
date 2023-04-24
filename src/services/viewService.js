import express from 'express';
import path from 'path';
import { __filename, __dirname } from '../utils/index.js';

const viewService = {
  serveStatics: (srcFolder) => {
    const src = path.join(__dirname, `../views/${srcFolder}`);
    const option = { index: `${srcFolder}.html` };

    console.log(src);

    return express.static(src, option);
  },
};

export default viewService;
