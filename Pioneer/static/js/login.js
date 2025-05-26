document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality (same as registration)
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const currentTheme = localStorage.getItem('theme') || 
                       (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
        themeLabel.textContent = 'Light Mode';
    }
    
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

    // Show Password Toggle
    const showPassword = document.querySelector('.show-password');
    const passwordInput = document.getElementById('password');
    
    if (showPassword && passwordInput) {
        showPassword.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.textContent = '👁️';
                this.title = 'Hide password';
            } else {
                passwordInput.type = 'password';
                this.textContent = '👁️';
                this.title = 'Show password';
            }
        });
    }

    // Form Validation
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would send this to your server
            alert('Login successful! (This is a demo)');
            // loginForm.reset();
            
            // Redirect to dashboard in a real app
            // window.location.href = 'dashboard.html';
        });
    }
});