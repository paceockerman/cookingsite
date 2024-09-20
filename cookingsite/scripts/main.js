//import { recipes } from "../recipes/recipes.js"

// Function to generate the recipe list
async function generateRecipeLinks() {
    const recipeList = document.getElementById('recipeList');
    let response = await fetch("../recipes/recipes.json")
    let recipes = await response.json()
    recipes.forEach(recipe => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `recipe.html?recipe=${recipe.id}`;
        link.textContent = recipe.name;
        listItem.appendChild(link);
        recipeList.appendChild(listItem);
    });
}

// Generate recipe links on page load
await generateRecipeLinks();
