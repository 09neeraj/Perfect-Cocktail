class UI
{
     //display drink Category
     displayCategory()
     { 
          cocktailapi.getCategory()
          .then(categories => {
               let categoryList = categories.categories.drinks;

               //create a default option 
               let defaultOption = document.createElement('option');
               defaultOption.innerText='-SELECT-';
               defaultOption.value='';
               document.querySelector('#search').appendChild(defaultOption);

               //add category and creating option element
               categoryList.forEach(category => {
                    let option = document.createElement('option');
                    option.innerText= category.strCategory;
                   // option.value=category.strCategory.replace(' ' , '_');
                   option.value=category.strCategory.split(' ').join('_');
                    document.querySelector('#search').appendChild(option);
               })

               
          })
     }

     //print cocktails without ingredients
     displayDrinks(drinks)
     {
        const resultWrapper = document.querySelector('.results-wrapper');
        resultWrapper.style.display = 'block';
        
        const result = document.querySelector('#results'); 

        drinks.forEach(I =>
          {
             result.innerHTML += `
             
             <div class="col-md-4">
                         <div class="card my-3">
                             <button type="button" data-id="${I.idDrink}" class="favorite-btn btn btn-outline-info">
                             +
                             </button>
                              <img class="card-img-top" src="${I.strDrinkThumb}" alt="${I.strDrink}">
                              <div class="card-body">
                                   <h2 class="card-title text-center">${I.strDrink}</h2>
                                   <a  data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" 
                                   data-id="${I.idDrink}">Get Recipe</a>
                              </div>
                         </div>
                    </div>
             `;
        });
     this.isFavorite();
     }

   
   //print cocktails with ingredients
    displayDrinkWithIngredients(drinks)
    {
        const resultWrapper = document.querySelector('.results-wrapper');
        resultWrapper.style.display = 'block';
        
        const result = document.querySelector('#results');
        

      drinks.forEach(I => 
       {
           
          
            result.innerHTML += `
                 <div class="col-md-6">
                      <div class="card my-3">
                           <button type="button" data-id="${I.idDrink}" class="favorite-btn btn btn-outline-info">
                           +
                           </button>
                           <img class="card-img-top" src="${I.strDrinkThumb}" alt="${I.strDrink}">

                           <div class="card-body">
                                <h2 class="card-title text-center">${I.strDrink}</h2>
                                <p class="card-text font-weight-bold">Instructions: </p>
                                <p class="card-text">
                                      ${I.strInstructions}
                                </p>

                                <p class="card-text">
                                <ul class="list-group">
                                        <li class="list-group-item alert 
                                         alert-danger">Ingredients</li>
                                         ${this.displayIngredients(I)}
                                </ul>
                            </p>                              
                                
                                <p class="card-text font-weight-bold">Extra Information:</p>
                                <p class="card-text">
                                     <span class="badge badge-pill badge-success">
                                          ${I.strAlcoholic}
                                     </span>
                                     <span class="badge badge-pill badge-warning">
                                          Category: ${I.strCategory}
                                     </span>
                                </p>
                           </div>
                      </div>
                 </div>
            `;
       });
     this.isFavorite();
    }

 
    displayIngredients(I)
 {
         let ingredients = [];
         for(let i=1; i<16; i++)
         {
          const ingredientMeasure = {};
              if(I[`strIngredient${i}`] !== null && I[`strMeasure${i}`] !== null)
              {
               ingredientMeasure.ingredient = I[`strIngredient${i}`];
               ingredientMeasure.measure = I[`strMeasure${i}`];
               ingredients.push(ingredientMeasure);

              }
              
         }
         let ingredientsTemplate = '';
         ingredients.forEach(ingredient => {
          ingredientsTemplate += `
               <li class="list-group-item ">${ingredient.ingredient} - ${ingredient.measure}</li>
          `;
                         
         })

         return ingredientsTemplate;
    }

    displaySingleRecipe(recipe)
    {
         console.log(recipe)
          const modalTitle = document.querySelector('.modal-title');
          const modalDescription = document.querySelector('.description-text');
          const modalIngredients = document.querySelector('.list-group');

          //set values
          modalTitle.innerHTML = recipe.strDrink;
          modalDescription.innerHTML = recipe.strInstructions;

          //display all the ingredients
          modalIngredients.innerHTML = this.displayIngredients(recipe);
    }

    printMessage(message , className)
    {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert"></button>
                ${message}
            </div>

        `;

        const destination = document.querySelector('.jumbotron h1');
        const parent = destination.parentElement;
        parent.insertBefore(div,destination);

        setTimeout(function()
        {
            document.querySelector('.jumbotron div').remove();
        },3000);
    }

    clearPreviousResult()
    {
         const resultDiv = document.querySelector('#results');
         resultDiv.innerHTML = '';
    }

    displayFavorites(drinks)
    {
         const tableBody = document.querySelector('#favorites tbody');


         drinks.forEach(drink =>
          {

          //create a row
               const tr = document.createElement('tr');

               tr.innerHTML = `
                              <td>
                                   <img src="${drink.image}" alt="${drink.name}" width=100>
                              </td>
                              <td>${drink.name}</td>
                              <td>
                                   <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}"
                                   class="btn btn-success get-recipe" >
                                        View
                                   </a>
                              </td>
                              <td>
                                   <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe" >
                                        Remove
                                   </a>
                              </td>
               `;
               tableBody.appendChild(tr);

          })

          
        
    }

    removeFavorite(element)
    {
         element.remove();
    }

    isFavorite()
    {
         //getting all the drinks store in local Storage
         const drinks = cocktaildb.getDrinks();

         drinks.forEach(drink => 
          {
              //get only id of each drink  
              let {id} = drink;
             
              let favoriteDrink = document.querySelector(`[data-id="${id}"]`); 
          //     let favoriteDrink = document.querySelector('data-id');
              console.log(favoriteDrink);
               //add classes if condition is true
              if(favoriteDrink)
              {
               console.log(favoriteDrink);
                   favoriteDrink.classList.add('is-favorite');
                   favoriteDrink.textContent = '-';
               
              }
              
         })


    }
    
}



    