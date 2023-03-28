export const joinIngredientsAndMeasures = (recipe: any) => {
    let ingredients = [];
    let plainIngredients: any = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
            plainIngredients.push(`${ingredient.trim()}`);
        }
    }
    return {ingredients, plainIngredients};
}
