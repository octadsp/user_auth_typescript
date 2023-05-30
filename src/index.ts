import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = "mongodb+srv://octaadsp:yMRYRhvrt3QvyTUG@cluster1.o0nlwma.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise; // Mengatur implementasi Promise bawaan JavaScript, untuk menghindari peringatan deprecated sehingga bisa menggunakan promise dari JS seperti async/await
mongoose.connect(MONGO_URL); // Membuat koneksi antara aplikasi dengan server DB mongo dengan URL
mongoose.connection.on('error', (error: Error) => console.log(error)); // Pesan Error ketika gagal melakukan koneksi ke server DB mongo , maka function callback akan dijalankan