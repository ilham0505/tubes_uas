let modal;
let currentId = null;

function loadDropdown() {
    fetch('/mahasiswa')
        .then(res => res.json())
        .then(data => {
            let opt = '<option value="">Pilih Mahasiswa</option>';
            data.forEach(m => {
                opt += `<option value="${m.id}">${m.nama}</option>`;
            });
            document.getElementById('mahasiswa').innerHTML = opt;
        });

    fetch('/matakuliah')
        .then(res => res.json())
        .then(data => {
            let opt = '<option value="">Pilih Mata Kuliah</option>';
            data.forEach(mk => {
                opt += `<option value="${mk.id}">
                            ${mk.kode_mk} - ${mk.nama_mk}
                        </option>`;
            });
            document.getElementById('matakuliah').innerHTML = opt;
        });
}

function loadNilai() {
    fetch('/nilai')
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(n => {
                html += `
                    <tr>
                        <td>${n.nama}</td>
                        <td>${n.nama_mk}</td>
                        <td>${n.nilai}</td>
                        <td>
                            <button class="btn btn-sm btn-warning"
                                onclick="editNilai(${n.id}, ${n.nilai})">
                                Edit
                            </button>
                            <button class="btn btn-sm btn-danger"
                                onclick="hapusNilai(${n.id})">
                                Hapus
                            </button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById('tabel-nilai').innerHTML = html;
        });
}

function simpanNilai() {
    const mahasiswa_id = document.getElementById('mahasiswa').value;
    const mata_kuliah_id = document.getElementById('matakuliah').value;
    const nilai = document.getElementById('nilai').value;

    if (!mahasiswa_id || !mata_kuliah_id || nilai === '') {
        alert('Semua field wajib diisi');
        return;
    }

    fetch('/nilai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mahasiswa_id, mata_kuliah_id, nilai })
    })
    .then(() => {
        document.getElementById('nilai').value = '';
        loadNilai();
    });
}

function editNilai(id, nilai) {
    currentId = id;
    document.getElementById('edit_nilai').value = nilai;
    modal.show();
}

function updateNilai() {
    fetch('/nilai/' + currentId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nilai: document.getElementById('edit_nilai').value
        })
    })
    .then(() => {
        modal.hide();
        loadNilai();
    });
}

function hapusNilai(id) {
    if (!confirm('Yakin hapus nilai ini?')) return;

    fetch('/nilai/' + id, { method: 'DELETE' })
        .then(() => loadNilai());
}

document.addEventListener('DOMContentLoaded', () => {
    modal = new bootstrap.Modal(document.getElementById('modalEdit'));
    loadDropdown();
    loadNilai();
});
