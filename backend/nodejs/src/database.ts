import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: path.join(path.resolve(), '..', '..','.env') });

const DB_USERNAME = process.env.DB_USERNAME!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_NAME = process.env.DB_NAME!;
const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.zjmzd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export default async function moongose_connect() {
    try {
      await mongoose.connect(DB_URI)
        .then(() => {
            console.log(`🚀 Connected to ==> ${DB_URI}`);
        });
    } catch (e) {
      console.error(e);
    }
}