class UI{
    //display all the te drink category
    displayCategory(){
        const categoryList=cocktail.getCategories()
        .then(categories=>{
            const catList=categories.categories.drinks;
            //append a first api json without value
            const firstOption=document.createElement('option')
            firstOption.textContent='-select-';
            firstOption.value='';
            document.querySelector('#search').appendChild(firstOption);

            //appends into the space
            catList.forEach(category=>{
                const option=document.createElement('option');
                option.textContent=category.strCategory;
                option.value=category.strCategory.split(' ').join('_');

                document.querySelector('#search').appendChild(option);
            })
        })
    }
    //display drinks without ingrediants
    displayDrinks(drinks){
        //show the results
        const resultsWrapper=document.querySelector('.results-wrapper');
        resultsWrapper.style.display='block';
        //insert the results
        const resultsDiv=document.querySelector('#results');
        drinks.forEach(drink=>{
            resultsDiv.innerHTML +=`
            <div class="col-md-4">
            <div class="card my-3">
            <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                    +
                    </button>
            <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <div class="card-body">
                <h2 class="card-title text-center">${drink.strDrink}</h2>
                <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                </div>
            </div>
             
            </div>`;
        });
        this.isFavorite();
    }
    //display drinks with ingrediants
    displayDrinksWithIngrediants(drinks){
        //show the results
        const resultsWrapper=document.querySelector('.results-wrapper');
        resultsWrapper.style.display='block';

        //insert the result
        const resultsDiv=document.querySelector('#results');

        drinks.forEach(drink=>{
            resultsDiv.innerHTML +=`
            <div class="col-md-6">
                <div class="card my-3">
                    <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                    +
                    </button>
                    <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                    <div class="card-body">
                        <h2 class="card-title text-center">${drink.strDrink}</h2>
                        <p class="card-text font-weight-bold">Instructions:</p>
                        <p class=""card-text">
                            ${drink.strInstructions}
                        </p>
                        <p class="card-text">
                        <ul class="list-group">
                        <li class="list-group-item alert alert-danger">Ingredients</li>
                        ${this.displayIngredients(drink)}

                        </ul>
                       </p> 
                       <p class="card-text font-weight-bold">Extra Information</p>
                       <p class="card-text">
                       <span class="badge badge-pil badge-success">
                       ${drink.strAlcoholic}
                       
                       </span>
                       <span class="badge badge-pil badge-warning">
                       Category: ${drink.strCategory}
                       </span>
                </div>
            </div>`
        })
        this.isFavorite();

    }
    //prints the infgredients and Measurements
     displayIngredients(drink){
         let ingredients=[];
         for(let i=1;i<16;i++){
             const ingredientMeasure={};
             if(drink[`strIngredient${i}`]!==null){
                 ingredientMeasure.ingredient=drink[`strIngredient${i}`];
                 ingredientMeasure.measure=drink[`strMeasure${i}`];
                 ingredients.push(ingredientMeasure);
             } 
         }
         //console.log(ingredients)
        // console.log(drink);
        //Build templete
        let ingrediantsTemplate='';
        ingredients.forEach(ingredient=>{
          ingrediantsTemplate+=` <li class="list-group-item ">${ingredient.ingredient}-${ingredient.measure}</li>` ; 
        });
        return ingrediantsTemplate;
     } 

     //display single recipe
     displaySingleRecipe(recipe){
         //Get variable
         const modalTitle=document.querySelector('.modal-title'),
              modalDescription=document.querySelector('.modal-body .description-text');
              const modalIngredient=document.querySelector('.modal-body .ingredient-list .list-group');

              //set the values
              modalTitle.innerHTML=recipe.strDrink;
              modalDescription.innerHTML=recipe.strInstructions;
              modalIngredient.innerHTML=this.displayIngredients(recipe);

         console.log(recipe);
     }
     
    //Display custom message
    printMessage(message,className){
      const div=document.createElement('div');
      //Add the Html
      div.innerHTML=`<div class="alert alert-dismissible alert-${className}">
      <button type="button" class="close" data-dismiss="alert">X</button>
      ${message}
      </div>
      `;

      //Insert before
      const reference=document.querySelector('.jumbotron h1');
      const parentNode=reference.parentElement;
      parentNode.insertBefore(div,reference);

    //remove after 3 seconds
    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000);
    

    }
    clearResults(){
        const resultsDiv=document.querySelector('#results');
        resultsDiv.innerHTML=``;
    }
    //Display favorites from storages
    displayFavorites(favorites){
        const favoritesTable=document.querySelector('#favorites tbody');
        favorites.forEach(drink=>{
            const tr=document.createElement('tr');
            tr.innerHTML=`
            <td>
            <img src="${drink.image}" alt="${drink.name}" width=100>
            </td>
            <td>${drink.name}</td>
            <td>
            <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">
            View
            </a>

            </td>
            <td>
            <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">
            Remove
            </a>

            </td>
            `;
            favoritesTable.appendChild(tr);
            
        })
    }
    removeFavorites(element){
        element.remove();
        
    }

    //Add class when cocktail is favorite
    isFavorite(){
    const drinks=cocktailDB.getFromDB();
    drinks.forEach(drink=>{
    //destucting the id
    let {id}=drink;
    //select the favorites
    let favoriteDrink=document.querySelector(`[data-id="${id}"]`);
    if(favoriteDrink){
        favoriteDrink.classList.add('is-favorite');
        favoriteDrink.textContent='-';
    }    
});
    }
}