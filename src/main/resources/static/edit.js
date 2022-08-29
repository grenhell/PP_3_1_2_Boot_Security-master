let editModal = new bootstrap.Modal(document.getElementById('editModal'), {
    keyboard: false
})

let usersTable = document.querySelector('#usersTable')

const submitEdit = document.querySelector('#submitEdit')

const idEdit = document.querySelector('#idEdit')
const firstNameEdit = document.querySelector('#firstnameEdit')
const lastnameEdit = document.querySelector('#lastnameEdit')
const ageEdit = document.querySelector('#ageEdit')
const emailEdit = document.querySelector('#emailEdit')
const passwordEdit = document.querySelector('#passwordEdit')

const rolesEdit = document.querySelector('#rolesEdit')



//
eventButton(document, 'click', '#editModalOpen', e => {
    const parentTr = e.target.parentNode.parentNode
    const id = parentTr.firstElementChild.innerHTML
    addRolesForSelect(rolesEdit)


    fetch("http://localhost:8080/api/users/" + id)
        .then(res => res.json())
        .then(user => {
            idEdit.value = user.id
            firstNameEdit.value = user.firstname
            lastnameEdit.value = user.lastname
            ageEdit.value = user.age
            emailEdit.value = user.email
            passwordEdit.value = ' '
        })

})

submitEdit.addEventListener('submit', (e) => {
    // e.preventDefault();
    e.stopPropagation();
    let id = idEdit.value
    let roleNames = getSelectValues(rolesEdit)

    fetch("http://localhost:8080/api/users/" + '?inputRoles=' + roleNames, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': idEdit.value,
            'firstname': firstNameEdit.value,
            'lastname': lastnameEdit.value,
            'age': ageEdit.value,
            'email': emailEdit.value,
            'password': passwordEdit.value

        })
    })
        .then(() => {
            editModal.hide()
            Array.from(usersTable.querySelectorAll('tr')).map(tr => {
                if (tr.firstElementChild.innerHTML === id) {
                    let currentNode = tr.firstChild
                    currentNode.textContent = idEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = firstNameEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = lastnameEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = ageEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = emailEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = passwordEdit.value
                    currentNode = currentNode.nextSibling
                    getRoleForUserById(id, currentNode)
                }
            })
        })
})

function getRoleForUserById(id , node){
    let res = ''
    fetch('http://localhost:8080/api/users/'+id)
        .then(res => res.json())
        .then(user => {
            user.roles.forEach(role => {
                res += role.name.replace("ROLE_", "")
            })
            node.textContent = res
        })
}

function validateEditForm()
{
    let x=document.forms["submitNameEdit"]["inputRoles"].value;
    if (x==null || x=="")
    {
        alert("Необходимо выбрать Роли!");
        return false;
    }
}