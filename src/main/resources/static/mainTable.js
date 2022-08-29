const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('http://localhost:8080/api/users/'),
}

function getTableWithUsers() {
    let table = $('#usersTable tbody');

    userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {

            users.forEach(user => {
                let tableFilling = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstname}</td>
                            <td>${user.lastname}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map(role => role.name === 'ROLE_USER' ? ' USER' : ' ADMIN')}</td>
                           <td><button data-bs-toggle="modal" id="editModalOpen" data-bs-target="#editModal" class="btnEdit btn btn-info">Edit</button></td>
                           <td><button data-bs-toggle="modal" id="deleteModalOpen" data-bs-target="#deleteModal" class="btnDelete btn btn-danger">Delete</button></td>
                        </tr>
                )`;
                table.append(tableFilling);
            })
        })

}

getTableWithUsers()

// function getRoleForUser(user){
//     let roles = ''
//     user.authorities.forEach(role => {
//         roles += role.name.replace("ROLE_", "")
//     })
//     return roles
// }

