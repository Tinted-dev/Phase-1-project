
//function to collect data from the server
const baseUrl = "http://localhost:3000"
// http://localhost:3000/garbageCollectors
// console.log('server check')
function collectData() {
    const form = document.querySelector('form')
    console.log(form)
//attach an eventListener
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formDAta = {
        "name" : e.target.name.value,
        "contact" : e.target.contact.value,
        "area" : e.target.area.value,
        "days" : e.target.days.value,
    }
    form.reset()
    console.log(formDAta)
    postData(formDAta)
})
}
collectData()

//API
// fetch()
//endpoint /students
//payload /formData

function postData(formDAta){
    fetch(`${baseUrl}/garbageCollectors`, {
        method : 'POST' ,
        headers: {
            'content-Type': 'application/json'
        },
        body:JSON.stringify(formDAta)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

//GET request

function fetchCollectors(){
    fetch(`${baseUrl}/garbageCollectors`)
    .then(response => response.json())
    .then(data=> data.forEach((item) => {
        displayCollectors(item)
    }))
}
fetchCollectors()

function displayCollectors(item) {
    const tableBody = document.querySelector('#body')
    const row = document.createElement('tr')
    row.innerHTML = `
     <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.contact}</td>
            <td>${item.area}</td>
            <td>
                <button type="button" class="btn btn-warning">Edit</button>
                <button type="button" id="delete" class="btn btn-danger">Delete</button>
            </td>
    `
    tableBody.appendChild(row)

}
    //delete

    const deleteButton = row.querySelector('#delete')
    deleteButton.addEventListener('click', () => {
        fetch(`${baseUrl}/garbageCollectors/${item.id}`, {
            method: 'DELETE',
            headers: {
                'content-Type' : 'applcation/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
    })
