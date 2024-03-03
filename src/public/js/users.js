const deleteButtons = document.querySelectorAll('.delete-button');

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