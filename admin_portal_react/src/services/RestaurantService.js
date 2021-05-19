import axios from "axios";

const RESTAURANT_API_BASE_URL = 'http://localhost:8080/restaurant';

class RestaurantService {

    getRestaurant(page){
        return axios.get(RESTAURANT_API_BASE_URL + "/all/page/" + page);
        // let response =  axios.get(RESTAURANT_API_BASE_URL + "/all/page/" + page);
        // console.log(response);
        // return response
    }

    createRestaurant(restaurant){
        return axios.post(RESTAURANT_API_BASE_URL, restaurant);
    }

    getRestaurantById(restaurantId){
        return axios.get(RESTAURANT_API_BASE_URL + '/' + restaurantId);
    }

    updateRestaurant(restaurant, restaurantId){
        return axios.put(RESTAURANT_API_BASE_URL + '/' + restaurantId, restaurant);
    }

    deleteRestaurant(restaurantId){
        return axios.delete(RESTAURANT_API_BASE_URL + '/' + restaurantId);
    }
}

export default new RestaurantService()
