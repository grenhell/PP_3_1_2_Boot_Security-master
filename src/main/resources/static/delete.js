let deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
    keyboard: false
})

const submitDelete = document.querySelector('#submitDelete')
const idDelete = document.querySelector('#idDelete')
const firstNameDelete = document.querySelector('#firstnameDelete')
const lastnameDelete = document.querySelector('#lastnameDelete')
const ageDelete = document.querySelector('#ageDelete')
const emailDelete = document.querySelector('#emailDelete')


const eventButton = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}


eventButton(document, 'click', '#deleteModalOpen', e => {
    const parentTr = e.target.parentNode.parentNode
    const id = parentTr.firstElementChild.innerHTML

    fetch("http://localhost:8080/api/users/" + id)
        .then(res => res.json())
        .then(user => {
            idDelete.value = user.id
            emailDelete.value = user.email
            firstNameDelete.value = user.firstname
            lastnameDelete.value = user.lastname
            ageDelete.value = user.age
        })

})

submitDelete.addEventListener('submit', (e) => {

    let id = idDelete.value
    fetch("http://localhost:8080/api/users/" + id,{
        method: 'DELETE'
    })
        .then(() => {
            deleteModal.hide()
            Array.from(usersTable.querySelectorAll('tr')).map(tr => {
                if (tr.firstElementChild.innerHTML === id) {
                    tr.parentNode.removeChild(tr)
                }
            })
        })
})