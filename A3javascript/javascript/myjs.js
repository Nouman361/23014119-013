// Enhanced functions with practical implementations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    displayCurrentYear();
    setupEventListeners();
    updateRecipeDates();
});

function setupEventListeners() {
    // Search functionality
    document.getElementById('input').addEventListener('input', function(e) {
        filterRecipes(e.target.value);
    });
    
    // Newsletter form validation
    document.querySelector('footer input[type="email"]').addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showAlert('Please enter a valid email for our newsletter');
        }
    });
    
    // Scroll to top button visibility
    window.addEventListener('scroll', function() {
        const topButton = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    });
}

// Recipe-related functions
function saveRecipe(recipeId) {
    const recipeTitle = document.querySelector(`#recipe-time-${recipeId}`).previousElementSibling.textContent;
    showAlert(`Saved "${recipeTitle}" to your favorites!`);
    // In a real app, would save to localStorage/database
}

function showRecipeDetails(recipeId) {
    // This would normally fetch details from an API
    const recipeTitle = document.querySelector(`#recipe-time-${recipeId}`).previousElementSibling.textContent;
    showAlert(`Loading details for: ${recipeTitle}`);
    // toggleVisibility(`recipe-modal-${recipeId}`); // If you had modals
}

function updateRecipeDates() {
    document.querySelectorAll('.date-display').forEach(el => {
        el.textContent = getCurrentDateTime();
    });
}

// Theme toggler
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('bg-gray-50')) {
        body.classList.remove('bg-gray-50');
        body.classList.add('bg-gray-800', 'text-white');
        changeBackgroundColor('#1F2937');
    } else {
        body.classList.add('bg-gray-50');
        body.classList.remove('bg-gray-800', 'text-white');
        changeBackgroundColor('');
    }
}

// Enhanced filter function
function filterRecipes(searchTerm) {
    const recipes = document.querySelectorAll('.recipe-card');
    if (!searchTerm) {
        recipes.forEach(recipe => recipe.style.display = 'block');
        return;
    }
    
    recipes.forEach(recipe => {
        const title = recipe.querySelector('.recipe-title').textContent.toLowerCase();
        const description = recipe.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase())) {
            recipe.style.display = 'block';
        } else {
            recipe.style.display = 'none';
        }
    });
}

// Keep your existing functions but make them more specific:
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message) {
    // Create a nice toast notification instead of default alert
    const toast = document.createElement('div');
    toast.className = 'fixed top-5 right-5 bg-primaryDark text-white px-4 py-2 rounded shadow-lg';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getCurrentDateTime() {
    return new Date().toLocaleDateString();
}

function displayCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}