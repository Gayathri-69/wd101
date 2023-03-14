let form = document.getElementById("l-form");
const dobInput = document.getElementById('dob');

dobInput.addEventListener('input', (event) => {
    const date = new Date(event.target.value);
    const present = new Date();
    const age = present.getFullYear() - date.getFullYear();

    if ((age < 18) || age > 55) {
        dobInput.setCustomValidity('Please enter a valid dob between 18 and 55.');
    }
    else{
        dobInput.setCustomValidity('');
    }
});

const getentries = ()=>{
    let uentries = localStorage.getItem("user-entries");
    if(uentries){
        uentries = JSON.parse(uentries);
    }
    else{
        uentries = [];
    } 
    return uentries;
}
let data = getentries();

const showentries =()=>{
    const entries = getentries();
    const tabentries = entries.map((entry)=>{
        const nameCell = `<td>${entry.n}</td>`;
        const emailCell = `<td>${entry.el}</td>`;
        const passwordCell = `<td>${entry.pass}</td>`;
        const dobCell = `<td>${entry.d}</td>`;
        const acceptTermsCell = `<td>${entry.ch}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>dob</th>
            <th>accepted terms?</th>
        </tr>${tabentries}
    </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const saveform = (event)=>{
    event.preventDefault();
    const n = document.getElementById("name").value; 
    const el = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const d = document.getElementById("dob").value;
    const ch = document.getElementById("acceptterms").checked;
    const entry = {
        n,
        el,
        pass,
        d,
        ch
    }
    data.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(data));
    showentries();
}

form.addEventListener("submit",saveform); 

showentries();
