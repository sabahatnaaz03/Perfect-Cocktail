//instancite the class

const ui=new UI();
const cocktail=new CocktailAPI();
const cocktailDB=new CocktailDB();


//create the the Event Listenner
function eventListeners() {
    //Document REady
    document.addEventListener('DOMContentLoaded',documentReady);
    //add event listerner when form is submitted
    const seacrchform=document.querySelector('#search-form');
    if(seacrchform){
        seacrchform.addEventListener('submit',getcocktails); 
    }
    //The results div listenners
    const resultsDiv=document.querySelector('#results');
    if(resultsDiv){
        resultsDiv.addEventListener('click',resultDelegation);
    }

}

eventListeners();
//create function getcocktails
function getcocktails(e){
e.preventDefault();
const seacrchTerm=document.querySelector('#search').value;
if(seacrchTerm===''){
    //call user interface print message
    ui.printMessage('Pease add something into the form','danger')
}
    
else{
    //server response from promise
    let serverResponse;
    //Type of search(ingredeints,cocktails or name)
    const type=document.querySelector('#type').value;

    //Evaluate the type of method and then execute the quary
    switch(type){
        case 'name':
            serverResponse=cocktail.getDrinksByName(seacrchTerm);
            break;
        case 'ingredient':
            serverResponse=cocktail.getDrinksByIngredient(seacrchTerm);
            break;
        case 'category':
            serverResponse=cocktail.getDrinksByCategory(seacrchTerm);
            break;
        case 'alcohol':
            serverResponse=cocktail.getDrinksByAlcohol(seacrchTerm);
            break;


    }
    ui.clearResults();
    
    serverResponse.then(cocktails=>{
        if(cocktails.cocktails.drinks==null){
            //Nothing exists
            ui.printMessage('There\'re no result, try a different term','danger')

        }else{
            if(type==='name'){
           ui.displayDrinksWithIngrediants(cocktails.cocktails.drinks);
            }
            else{
                //without ingredients(cocaktails,alcohal)
                ui.displayDrinks(cocktails.cocktails.drinks)
            }
        }
    })
   
    }
    

}

 //Delegation function result area
 function resultDelegation(e){
    e.preventDefault()

    if(e.target.classList.contains('get-recipe')){
        cocktail.getSinglerecipe(e.target.dataset.id)
        .then(reciepe=>{
            ui.displaySingleRecipe(reciepe.recipe.drinks[0]);
        })
    }
 //when favorite btn is clicked
 if(e.target.classList.contains('favorite-btn')){
     if(e.target.classList.contains('is-favorite')){
         //remove the class
         e.target.classList.remove('is-favorite');
         e.target.textContent='+';
//Remove from storage
         cocktailDB.removefromDB(e.target.dataset.id);
     }
     else{
         //Add the class
         e.target.classList.add('is-favorite');
         e.target.textContent='-';

         //Get info
         const cardBody=e.target.parentElement;
        const drinkInfo={
            id:e.target.dataset.id,
            name:cardBody.querySelector('.card-title').textContent,
            image:cardBody.querySelector('.card-img-top').src
        } 
        //console.log(drinkInfo);
         //Add to the storage
         cocktailDB.saveIntoDB(drinkInfo); 
     }
 }

}
function documentReady(){
    //display on load the favorite from storage
    ui.isFavorite();
     //select the search category
     const searchCategory=document.querySelector('.search-category');
     if(searchCategory){
         ui. displayCategory();
     }
}  

//when favorites page
const favoritesTable=document.querySelector('#favorites');
if(favoritesTable){
    //Get the favorites from storages and display lines
    const drinks=cocktailDB.getFromDB();
    ui.displayFavorites(drinks);
    //when view and delete
    favoritesTable.addEventListener('click',(e)=>{
        e.preventDefault();
        if(e.target.classList.contains('get-recipe')){
            cocktail.getSinglerecipe(e.target.dataset.id)
            .then(reciepe=>{
                ui.displaySingleRecipe(reciepe.recipe.drinks[0]);
            })
        }
        //when it is remove
        if(e.target.classList.contains('remove-recipe')){
            //remove from DOM
            ui.removeFavorites(e.target.parentElement.parentElement);
        //Remove from the local storage
        cocktailDB.removefromDB(e.target.dataset.id);
        }

    })

}


