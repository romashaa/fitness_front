const MEALS_URL = "/api";


export const fetchMeals = async () => {
    const response = await fetch(`${MEALS_URL}/meals`);
    const meals = await response.json();
    return meals;
};