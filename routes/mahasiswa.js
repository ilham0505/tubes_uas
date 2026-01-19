const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM mahasiswa ORDER BY id DESC', (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const { nim, nama } = req.body;
    db.query(
        'INSERT INTO mahasiswa (nim, nama) VALUES (?, ?)',
        [nim, nama],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Mahasiswa ditambahkan' });
        }
    );
});

router.put('/:id', (req, res) => {
    const { nim, nama } = req.body;
    db.query(
        'UPDATE mahasiswa SET nim=?, nama=? WHERE id=?',
        [nim, nama, req.params.id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Mahasiswa diupdate' });
        }
    );
});

router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM mahasiswa WHERE id=?',
        [req.params.id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Mahasiswa dihapus' });
        }
    );
});

module.exports = router;
