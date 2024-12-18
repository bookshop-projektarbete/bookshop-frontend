document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');  // Select the contact form
    const submitButton = form.querySelector('button[type="submit"]');  // Select the submit button

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        // Clear any previous success or error messages
        const existingSuccessMessage = document.querySelector('.alert-success');
        const existingErrorMessage = document.querySelector('.alert-error');
        if (existingSuccessMessage) existingSuccessMessage.remove();
        if (existingErrorMessage) existingErrorMessage.remove();

        // Check if the form is valid
        if (form.checkValidity()) {
            // Display success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('alert', 'alert-success');
            successMessage.textContent = 'Your message has been successfully sent!';

            // Append success message after the form
            form.appendChild(successMessage);

            // Clear the form after a short delay
            setTimeout(() => {
                form.reset();  // Reset form fields
                successMessage.remove();  // Remove the success message after 3 seconds
            }, 3000);  // 3 seconds delay
        } else {
            // Display error message if form is invalid
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('alert', 'alert-error');
            errorMessage.textContent = 'Please fill out all required fields correctly.';

            // Append error message after the form
            form.appendChild(errorMessage);

            // Prevent page reload or submission if form is invalid
            setTimeout(() => {
                errorMessage.remove();  // Remove the error message after 3 seconds
            }, 3000);  // 3 seconds delay
        }
    });
});
