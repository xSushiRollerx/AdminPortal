
import axios from "axios";

const RESTAURANT_SERVICE_BASE_URL = 'http://localhost:8040';

const RestaurantService = {

    getRestaurant: async function (id) {
        return axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurant/" + id);
    },

    getAllRestaurants: async function (page, pageSize, inactive, keyword) {
        //add header to gain access to autocomplete function
        //const jwtToken = 'Bearer ' + localStorage.getItem('jwt');
        const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5OCIsImV4cCI6MTYyNTYyNTQ3MSwiaWF0IjoxNjI1MjY1NDcxfQ.gzD-4qXhqFrz8goUy5Mr-3Y_AG7On47Aa_mWWKnpUCY'
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            }
        };

        try {
            if (keyword.trim() === "") {
                let response = axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurants/all/" + page + "?pageSize=" + pageSize + "&priceCategories=" + encodeURI("1,2,3,4")
                    + "&rating=0&sort=a-to-z", config);
                return response
            } else {
                let response = axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurants/name?pageSize=" + pageSize + "&page=" + page + "&keywords=" + keyword + "&active=" + inactive, config);
                return response;
            }
        } catch (err) {

            return { data: "Error", status: 500 };
        }
    }



}

export default RestaurantService;