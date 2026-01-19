function loadStatistik() {
    fetch('/mahasiswa')
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-mahasiswa').innerText = data.length;
        });

    fetch('/matakuliah')
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-mk').innerText = data.length;
        });

    fetch('/nilai')
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-nilai').innerText = data.length;
        });
}

function loadDashboardNilai() {
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
                    </tr>
                `;
            });
            document.querySelector('#tabel-dashboard tbody').innerHTML = html;
        });
}

loadStatistik();
loadDashboardNilai();
