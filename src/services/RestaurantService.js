import axios from "axios";

const RESTAURANT_API_BASE_URL = 'http://localhost:8080/restaurant';

class RestaurantService {

    getRestaurant(){
        return axios.get(RESTAURANT_API_BASE_URL);
    }

    createFood(restaurant){
        return axios.post(RESTAURANT_API_BASE_URL, restaurant);
    }

    getRestaurantById(restaurantId){
        return axios.get(RESTAURANT_API_BASE_URL + '/' + restaurantId);
    }

    updateFood(restaurant, restaurantId){
        return axios.put(RESTAURANT_API_BASE_URL + '/' + restaurantId, restaurant);
    }

    deleteRestaurant(restaurantId){
        return axios.delete(RESTAURANT_API_BASE_URL + '/' + restaurantId);
    }
}

export default new RestaurantService()
