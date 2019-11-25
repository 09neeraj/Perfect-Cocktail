class CocktailByName {



     printDrinks(drink) {

          let ingredients = [];
          for (let i = 1; i < 16; i++) {
               const ingredientMeasure = {};
               if (drink[`strIngredient${i}`] !== '') {
                    ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                    ingredientMeasure.measure = drink[`strMeasure${i}`];
                    ingredients.push(ingredientMeasure);
               }
          }


          // Build the template

          let ingredientsTemplate = '';
          ingredients.forEach(ingredient => {
               ingredientsTemplate += `
                     <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
                `;
          });

          return ingredientsTemplate;
     }

}