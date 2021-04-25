class CocktailAPI{
    //Get recipe by name
    async getDrinksByName(name){
        //search by name
        const apiResponse=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
        );
//Return a json response
const cocktails=await apiResponse.json();
return{
    cocktails
} 
    }
    //Get recipes by ingredients
    async getDrinksByIngredient(ingredient){
        //Search by ingredient
        const apiResponse=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        //Return a json response
        const cocktails=await apiResponse.json();
        return{
            cocktails
        }
    }

    async getSinglerecipe(id){
        //Search by id
        const apiResponse=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        //Return a json response
        const recipe=await apiResponse.json();
        return{
            recipe
        }
    }
    //Retrieves all the categories from Rest API
    async getCategories(){
        const apiResponse=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        //wait for response and Return a json 
        const categories=await apiResponse.json();
        return{
            categories
        }
    }
    //get Drinks by category
    async getDrinksByCategory(category){
        const apiResponse=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        //Return a json response
        const cocktails=await apiResponse.json();
        return{
            cocktails
        }

    }
    async getDrinksByAlcohol(alcohol){
        const apiResponse=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`);
        //Return a json response
        const cocktails=await apiResponse.json();
        return{
            cocktails
        }

    }
}
