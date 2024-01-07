const form = document.getElementById('resetForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("ENTRO EN RESET PASS");

    const email = form['email'].value;

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();

        if (!response.ok) {
            const error = document.querySelector('.error');
            error.textContent = data.error;
            error.style.display = 'block';
          } else {
            const succes = document.querySelector('.success');
            succes.textContent = "Mail enviado correctamente";
            succes.style.display = 'block';
          }
          
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }


});


