const addNewUser = document.querySelector('#addNewUser')
const addFirstname = document.querySelector('#AddFirstname')
const addLastname = document.querySelector('#AddLastname')
const addPassword = document.querySelector('#AddPassword')
const addEmail = document.querySelector('#AddEmail')
const addAge = document.querySelector('#AddAge')

const addRoles = document.querySelector('#addRoles')


addNewUser.addEventListener('submit', (e) => {
    // e.preventDefault()
    let roleNames = getSelectValues(addRoles)

    fetch("http://localhost:8080/api/users/" + '?inputRoles=' + roleNames, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            'firstname': addFirstname.value,
            'lastname': addLastname.value,
            'age': addAge.value,
            'password': addPassword.value,
            'email': addEmail.value,
        })
    })
        .then(res => res.json())
        .then(() => {
            getTableWithUsers()
            addEmail.value = ''
            addPassword.value = ''
            addFirstname.value = ''
            addLastname.value = ''
            addAge.value = ''

        })
})



//СПИСОК РОЛЕЙ ПРИ ОТКРЫТИИ МОДАЛКИ
function addRolesForSelect(iR) {
    let optionRole
    iR.options.length = 0
    fetch("http://localhost:8080/api/roles/")
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                optionRole = document.createElement('option')
                optionRole.text = role.name.replace("ROLE_", "")
                optionRole.value = role.id
                iR.appendChild(optionRole)
            })
        })
}

addRolesForSelect(addRoles)



function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value);
        }
    }
    return result;
}