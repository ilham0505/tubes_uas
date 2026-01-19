const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/mahasiswa', require('./routes/mahasiswa'));
app.use('/matakuliah', require('./routes/matakuliah'));
app.use('/nilai', require('./routes/nilai'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
