const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query(
        'SELECT * FROM mata_kuliah ORDER BY id DESC',
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

router.post('/', (req, res) => {
    console.log('REQ BODY:', req.body);

    const { kode_mk, nama_mk, sks } = req.body;

    if (!kode_mk || !nama_mk || sks === undefined) {
        return res.status(400).json({
            message: 'Data tidak lengkap',
            body: req.body
        });
    }

    db.query(
        'INSERT INTO mata_kuliah (kode_mk, nama_mk, sks) VALUES (?, ?, ?)',
        [kode_mk, nama_mk, sks],
        err => {
            if (err) {
                console.error('SQL ERROR:', err); // 👈 WAJIB
                return res.status(500).json(err);
            }
            res.json({ message: 'Mata kuliah ditambahkan' });
        }
    );
});

router.put('/:id', (req, res) => {
    const { kode_mk, nama_mk, sks } = req.body;

    db.query(
        'UPDATE mata_kuliah SET kode_mk=?, nama_mk=?, sks=? WHERE id=?',
        [kode_mk, nama_mk, sks, req.params.id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Mata kuliah diupdate' });
        }
    );
});

router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM mata_kuliah WHERE id=?',
        [req.params.id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Mata kuliah dihapus' });
        }
    );
});

module.exports = router;
