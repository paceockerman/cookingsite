// Get the search query from the URL parameters
function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('query');
}

// Initialize Fuse.js with options
const options = {
    keys: [{
        name: 'name',
        weight: 0.6
    },
    {
        name: 'ingredients',
        weight: 0.2
    }, {
        name: 'notes',
        weight: 0.2
    }
    ],
    includeMatches: true,
    threshold: 0.3
};

// Perform the search
async function searchRecipes(query) {
    let response = await fetch("../recipes/recipes.json")
    let recipeList = await response.json()
    recipes = []
    // add recipes
    for (recipe of recipeList) {
        let response = await fetch(`../recipes/${recipe.id}.json`)
        let recipeRes = await response.json()
        recipes.push(recipeRes)
    }

    const fuse = new Fuse(recipes, options);
    return fuse.search(query);
}

// Display search results
function displayResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous results
    if (results.length === 0) {
        searchResults.innerHTML = '<li>No recipes found.</li>';
    } else {
        results.forEach(result => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `recipe.html?recipe=${result.item.id}`;
            link.textContent = result.item.name;
            li.appendChild(link);
            searchResults.appendChild(li);
        });
    }
}

// Run search on page load
document.addEventListener('DOMContentLoaded', async () => {
    const query = getSearchQuery();
    if (query) {
        const results = await searchRecipes(query);
        console.log(results)
        displayResults(results);
    } else {
        document.getElementById('searchResults').innerHTML = '<li>Please enter a search term.</li>';
    }
});
