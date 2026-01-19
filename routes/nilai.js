const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    const sql = `
        SELECT nilai.id, mahasiswa.nama, mata_kuliah.nama_mk, nilai.nilai
        FROM nilai
        JOIN mahasiswa ON nilai.mahasiswa_id = mahasiswa.id
        JOIN mata_kuliah ON nilai.mata_kuliah_id = mata_kuliah.id
        ORDER BY nilai.id DESC
    `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

router.post('/', (req, res) => {
    const { mahasiswa_id, mata_kuliah_id, nilai } = req.body;
    db.query(
        'INSERT INTO nilai (mahasiswa_id, mata_kuliah_id, nilai) VALUES (?, ?, ?)',
        [mahasiswa_id, mata_kuliah_id, nilai],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Nilai ditambahkan' });
        }
    );
});

router.put('/:id', (req, res) => {
    db.query(
        'UPDATE nilai SET nilai=? WHERE id=?',
        [req.body.nilai, req.params.id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Nilai diupdate' });
        }
    );
});

router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM nilai WHERE id=?',
        [req.params.id],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Nilai dihapus' });
        }
    );
});

module.exports = router;
