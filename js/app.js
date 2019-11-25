//create instance of other classes so we can use them.

const cocktailapi = new CocktailAPI();
const cocktaildb = new CocktailDB();
const ui = new UI();

onPageLoad();

function onPageLoad() {
    //load the category
    document.addEventListener('DOMContentLoaded', documentReady);


    //event listner when form is submitted
    const formId = document.getElementById('search-form');
    if (formId) {
        formId.addEventListener('submit', getCocktails);
    }

    //the result div listner
    const resultDiv = document.querySelector('#results');
    if (resultDiv) {
        resultDiv.addEventListener('click', resultsDelegation);
    }

}

function getCocktails(e) {
    e.preventDefault();
    const search = document.getElementById('search').value;

    if (search === '') {
        ui.printMessage('Please add something to search', 'danger');
    }
    else {

        let serverResponse;

        //we store type of search (ingredients , cocktails , name)
        const type = document.querySelector('#type').value;

        switch (type) {
            case 'name':
                serverResponse = cocktailapi.getDrinksByName(search);
                break;

            case 'ingredient':
                serverResponse = cocktailapi.getDrinksByIngredients(search);
                break;

            case 'category':
                serverResponse = cocktailapi.getDrinksBycategory(search);
                break;

            case 'alcohol':
                serverResponse = cocktailapi.getDrinksByAlcohol(search);
                break;
        }

        ui.clearPreviousResult();

        serverResponse.then(function (data) {

            if (data.cocktails.drinks === null) {
                ui.printMessage('this is not a cocktail. Try something else', 'danger');
            }
            else {
                if (type === 'name') {
                    ui.displayDrinkWithIngredients(data.cocktails.drinks);
                }
                else {

                    ui.displayDrinks(data.cocktails.drinks);
                }
            }


        })
    }
}


function resultsDelegation(e) {
    e.preventDefault();

    if (e.target.classList.contains('get-recipe')) {

        cocktailapi.getSingleRecipe(e.target.getAttribute('data-id'))
            .then(recipe => {
                ui.displaySingleRecipe(recipe.recipe.drinks[0]);
            })
    }

    if (e.target.classList.contains('favorite-btn')) {
        if (e.target.classList.contains('is-favorite')) {
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            //remove from Local storage
            cocktaildb.removeFromLocalStorage(e.target.getAttribute('data-id'));
        }

        else {
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            //traversing 
            const buttonParent = e.target.parentElement;

            const drinkInfo = {
                id: e.target.getAttribute('data-id'),
                name: buttonParent.querySelector('.card-title').textContent,
                image: buttonParent.querySelector('.card-img-top').src
            }


            //save into local storage
            cocktaildb.saveDrinks(drinkInfo);
        }
    }

}

function documentReady() {

    //display from load
    ui.isFavorite();

    const searchCategory = document.querySelector('.search-category');
    if (searchCategory) {
        ui.displayCategory();
    }

    //if page is favorite page.
    const favoritesTable = document.querySelector('#favorites');
    if (favoritesTable) {
        //get favorite drinks from storage 
        const drinks = cocktaildb.getDrinks();
        //display drink
        ui.displayFavorites(drinks);

        // favoritesTable.addEventListener('click', resultsDelegation);
        favoritesTable.addEventListener('click', (e) => {

            e.preventDefault();
            if (e.target.classList.contains('get-recipe')) {
                cocktailapi.getSingleRecipe(e.target.getAttribute('data-id'))
                    .then(recipe => {
                        ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                    })
            }

            if (e.target.classList.contains('remove-recipe')) {
                //remove from DOM
                ui.removeFavorite(e.target.parentElement.parentElement);

                //remove from Local storage
                cocktaildb.removeFromLocalStorage(e.target.getAttribute('data-id'));
            }
        });
    }


}
