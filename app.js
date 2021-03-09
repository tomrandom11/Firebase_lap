const db = firebase.firestore();
const table = document.querySelector('#tbresult')
const form = document.querySelector('#addForm')



db.collection('APAP').get().then((snapshot) => {
    snapshot.forEach(doc => {
        showData(doc);
    });
});
// เพิ่มข้อมูล
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('APAP').add({

        id: form.id.value,
        name: form.name.value,
        lname: form.lname.value,


    });
});


// แสดงข่อมูล
function showData(doc) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = doc.data().id;
    cell2.innerHTML = doc.data().name;
    cell3.innerHTML = doc.data().lname;


    //ลบ
    let btn = document.createElement('button');
    btn.textContent = 'ลบ';
    btn.setAttribute('class', 'btn btn-danger');
    btn.setAttribute('data-id', doc.id);
    cell4.appendChild(btn);

    btn.addEventListener('click', (e) => {
        let id = e.target.getAttribute('data-id');
        db.collection('APAP').doc(id).delete();
    });
}