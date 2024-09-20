async function fillRecipe() {


    const urlParams = new URLSearchParams(window.location.search);
    const recipeFileName = urlParams.get('recipe'); // 'recipe' is the key we passed in the URL
    let response = await fetch(`../recipes/${recipeFileName}.json`)
    let recipe = await response.json()


    // get the recipe ID from the URL
    // lookup in recipelist
    // grab the recipe via import

    document.getElementById('name').textContent = recipe.name;
    document.getElementById('time-estimate').textContent = recipe.time + " minutes"; // TODO write a function to convert this correctly to hrs a minutes
    document.getElementById('servings').textContent = recipe.servings;
    document.getElementById('rating').textContent = recipe.rating + " stars";

    let ingredientsList = document.getElementById('ingredients');
    let stepsList = document.getElementById('steps');

    // Fill ingredients
    recipe.ingredients.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item;
        ingredientsList.appendChild(li);
    });

    // Fill steps
    recipe.steps.forEach(step => {
        let li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
    });

    // Fill additional notes
    document.getElementById('notes').textContent = recipe.notes;
}

await fillRecipe()