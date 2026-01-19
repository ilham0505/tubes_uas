let editMode = false;

function loadMK() {
    fetch('/matakuliah')
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(mk => {
                html += `
                    <tr>
                        <td>${mk.kode_mk}</td>
                        <td>${mk.nama_mk}</td>
                        <td>${mk.sks}</td>
                        <td>
                            <button class="btn btn-sm btn-warning"
                                onclick="editMK(${mk.id}, '${mk.kode_mk}', '${mk.nama_mk}', ${mk.sks})">
                                Edit
                            </button>
                            <button class="btn btn-sm btn-danger"
                                onclick="hapusMK(${mk.id})">
                                Hapus
                            </button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById('tabel-mk').innerHTML = html;
        });
}


function simpanMK() {
    const id = document.getElementById('id').value;
    const kode_mk = document.getElementById('kode_mk').value;
    const nama_mk = document.getElementById('nama_mk').value;
    const sks = document.getElementById('sks').value;

    if (kode_mk === '' || nama_mk === '' || sks === '') {
        alert('Semua field wajib diisi');
        return;
    }

    const url = id ? `/matakuliah/${id}` : '/matakuliah';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kode_mk, nama_mk, sks })
    })
    .then(() => {
        resetForm();
        loadMK();
    });
}

function editMK(id, kode_mk, nama_mk, sks) {
    document.getElementById('id').value = id;
    document.getElementById('kode_mk').value = kode_mk;
    document.getElementById('nama_mk').value = nama_mk;
    document.getElementById('sks').value = sks;
}

function hapusMK(id) {
    if (!confirm('Yakin hapus data ini?')) return;

    fetch(`/matakuliah/${id}`, { method: 'DELETE' })
        .then(() => loadMK());
}

function resetForm() {
    document.getElementById('id').value = '';
    document.getElementById('kode_mk').value = '';
    document.getElementById('nama_mk').value = '';
    document.getElementById('sks').value = '';
}

loadMK();
