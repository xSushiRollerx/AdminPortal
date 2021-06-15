import axios from "axios";

const FOOD_API_BASE_URL = 'http://localhost:8080/food';

class FoodService {

    getFood(){
        return axios.get(FOOD_API_BASE_URL);
    }

    createFood(food){
        return axios.post(FOOD_API_BASE_URL, food);
    }

    getFoodById(foodId){
        return axios.get(FOOD_API_BASE_URL + '/' + foodId);
    }

    updateFood(food, foodId){
        return axios.put(FOOD_API_BASE_URL + '/' + foodId, food);
    }

    deleteFood(foodId){
        return axios.delete(FOOD_API_BASE_URL + '/' + foodId);
    }
}

export default new FoodService()
