document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
        themeLabel.textContent = 'Light Mode';
    } else {
        themeLabel.textContent = 'Dark Mode';
    }
    
    // Toggle theme when switch is clicked
    themeToggle.addEventListener('change', function() {
        let theme;
        if (this.checked) {
            theme = 'dark';
            themeLabel.textContent = 'Light Mode';
        } else {
            theme = 'light';
            themeLabel.textContent = 'Dark Mode';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Form Validation
    const form = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('password2S');

    form.addEventListener('submit', function(e) {
        // Validate passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match!');
            //e.preventDefault();
            return;
        }
        
        // Validate terms checkbox
        if (!document.getElementById('terms').checked) {
            showError(document.getElementById('terms'), 'You must agree to the terms and conditions');
            //e.preventDefault();
            return;
        }
    });
    
    // Input validation on blur
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                showError(this, 'This field is required');
            } else {
                clearError(this);
            }
        });
    });
    
    // Helper function to show error messages
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#FF4D4D';
    }
    
    // Helper function to clear error messages
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--other-user-bubble').trim();
    }

    // Show/hide password toggle
    document.querySelectorAll('.show-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '👁️';
                this.title = 'Hide password';
            } else {
                input.type = 'password';
                this.innerHTML = '👁️';
                this.title = 'Show password';
            }
        });
    });
});