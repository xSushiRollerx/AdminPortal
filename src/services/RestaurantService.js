
import axios from "axios";

const RESTAURANT_SERVICE_BASE_URL = 'http://localhost:8040';

const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5OCIsImV4cCI6MTYyODYyMjY0MiwiaWF0IjoxNjI4MjYyNjQyfQ.Ou4rzYMHn5gIckNqqs1Y_EbPIXShTVYWK2tq2MPsIAU';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken
    }
};

const RestaurantService = {

    getRestaurant: async function (id) {
        return axios.get(RESTAURANT_SERVICE_BASE_URL + "/restaurant/" + id);
    },

    getAllRestaurants: async function (page, pageSize, inactive, keyword) {
        //add header to gain access to autocomplete function
        //const jwtToken = 'Bearer ' + localStorage.getItem('jwt');

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
    },

    addRestaurant: async function(name, street, city, state, zipCode, tags, price) {
        try {

            let restaurant = {
                city: city,
                name: name,
                priceCategory: price,
                state: state,
                streetAddress: street,
                tags: tags !== null && tags.trim() === '' ? null : tags, 
                zipCode: zipCode

            };
            console.log(restaurant);
            let response = await axios.post(RESTAURANT_SERVICE_BASE_URL + "/restaurant", restaurant, config);
            return response;
        } catch (err) {
            return { data: "Error", status: 500 };
        }
    }



}

export default RestaurantService;