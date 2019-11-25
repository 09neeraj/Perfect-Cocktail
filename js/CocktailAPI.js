class CocktailAPI {

    async getSingleRecipe(id) {
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const recipe = await url.json();

        return {
            recipe
        }
    }


    async getDrinksByName(cocktailName) {
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
        const cocktails = await url.json();

        return {
            cocktails
        }
    }


    async getDrinksByIngredients(ingredients) {
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`);
        const cocktails = await url.json();

        return {
            cocktails
        }
    }

    async getCategory() {

        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        const categories = await url.json();

        return {
            categories
        }
    }

    async getDrinksBycategory(category) {
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const cocktails = await url.json();

        return {
            cocktails
        }
    }


    async getDrinksByAlcohol(term) {
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
        const cocktails = await url.json();

        return {
            cocktails
        }
    }
}