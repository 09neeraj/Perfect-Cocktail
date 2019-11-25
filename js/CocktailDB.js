class CocktailDB {

    //save data in local storage
    saveDrinks(drink) {

        let drinks = this.getDrinks();
        drinks.push(drink);

        //add new array into local storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    //get data from local storage
    getDrinks() {
        let drink;
        if (localStorage.getItem('drinks') === null) {
            drink = [];

        }
        else {
            drink = JSON.parse(localStorage.getItem('drinks'));

        }

        return drink;
    }

    //remove element from local storage
    removeFromLocalStorage(id) {
        //get drinks from local storage
        const drinks = this.getDrinks();

        drinks.forEach((drink, index) => {
            if (id === drink.id) {
                drinks.splice(index, 1);
            }

        });

        //save updates in local storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

}