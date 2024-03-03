const deleteButtons = document.querySelectorAll('.delete-button');
const editButtons = document.querySelectorAll('.edit-button');

// Agrega un evento de clic a cada botón de eliminación
deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
        console.log('delete button clicked');

        // Obtiene el id específico del botón de eliminación clicado
        const id = deleteButton.getAttribute('data-id');

        // Realiza la petición de eliminación con el id específico
        fetch(`/users/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/users';
            }
        });
    });
});

// Agrega un evento de clic a cada botón de edición
editButtons.forEach(editButton => {
    editButton.addEventListener('click', () => {
        console.log('edit button clicked');

        // Obtiene el id específico del botón de edición clicado
        const id = editButton.getAttribute('data-id');

        // Abre modal para editar ro lde usuario
        let role;

        Swal.fire({
            title: 'Edit user role',
            text: 'What role do you want to assign to the user?',
            input: 'text',
            inputValidator: value => {
                if(!value) {
                    return 'Role is required'
                }
            }
        }).then(input => {
            role = input.value; 
            // Realiza la petición de edición con el id específico
            fetch(`/users/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role })
            })
        })
    });
});