let editMode = false;

function loadMahasiswa() {
    fetch('/mahasiswa')
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(m => {
                html += `
                    <tr>
                        <td>${m.nim}</td>
                        <td>${m.nama}</td>
                        <td>
                            <button class="btn btn-sm btn-warning"
                                onclick="editMahasiswa(${m.id}, '${m.nim}', '${m.nama}')">
                                Edit
                            </button>
                            <button class="btn btn-sm btn-danger"
                                onclick="hapusMahasiswa(${m.id})">
                                Hapus
                            </button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById('tabel-mahasiswa').innerHTML = html;
        });
}

function simpanMahasiswa() {
    const nim = document.getElementById('nim').value;
    const nama = document.getElementById('nama').value;
    const id = document.getElementById('id').value;

    if (nim === '' || nama === '') {
        alert('NIM dan Nama wajib diisi');
        return;
    }

    const url = id ? `/mahasiswa/${id}` : '/mahasiswa';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nim, nama })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById('nim').value = '';
        document.getElementById('nama').value = '';
        document.getElementById('id').value = '';
        loadMahasiswa();
    });
}

function editMahasiswa(id, nim, nama) {
    document.getElementById('id').value = id;
    document.getElementById('nim').value = nim;
    document.getElementById('nama').value = nama;
}

function hapusMahasiswa(id) {
    if (!confirm('Yakin hapus data?')) return;

    fetch(`/mahasiswa/${id}`, { method: 'DELETE' })
        .then(() => loadMahasiswa());
}

loadMahasiswa();
