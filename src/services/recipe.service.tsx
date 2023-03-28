import axios from "axios";

const base = 'https://www.themealdb.com/api/json/v1/1';

export async function getRandomMeal() {
    try {
        const response = await axios.get(base + '/random.php');
        return response.data;
    } catch (e) {
        return null;
    }
}

export async function getMealDetails(id: any) {
    try {
        const response = await axios.get(base + "/lookup.php?i=" + id);
        return response.data;
    } catch (e) {

    }
}

export async function getMealCategories() {
    try {
        const response = await axios.get(base + "/categories.php");
        return response.data;
    } catch (e) {

    }
}

export async function getRecipes(search: any) {
    try {
        const response = await axios.get(base + "/search.php?s=" + search);
        return response.data;
    } catch (e) {

    }
}
