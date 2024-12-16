// contact-form.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Check if the form is valid
        if (form.checkValidity()) {
            // Display success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('alert', 'alert-success');
            successMessage.textContent = 'Your message has been successfully sent!';

            // Add the success message to the form
            form.appendChild(successMessage);

            // Clear the form after a short delay
            setTimeout(() => {
                form.reset();
                successMessage.remove();
            }, 3000); // 3 seconds delay
        } else {
            // Display error message if form is not valid
            form.classList.add('was-validated');
        }
    });
});
