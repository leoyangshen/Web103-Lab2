import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import giftData from '../data/gifts.js';
import giftsController from '../controllers/gifts.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const giftsRouter = express.Router();

// giftsRouter.get('/', (req, res) => {
//   res.status(200).json(giftData)
// });

giftsRouter.get('/', giftsController.getGifts);

// giftsRouter.get('/:giftId', (req, res) => {
// res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))
// });

giftsRouter.get('/:giftId', giftsController.getGiftById)	
export default giftsRouter;
