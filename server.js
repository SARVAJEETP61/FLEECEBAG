import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/images', express.static('E:/Important Documents/Deakin university/Assignments/FLEECEBAG-main/images'));

const imagePath = path.join('E:/Important Documents/Deakin university/Assignments/FLEECEBAG-main/images');
app.use('/images', express.static(imagePath));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
