import axios from "axios";
import jwt_decode from 'jwt-decode'

const USER_API_BASE_URL = 'http://localhost:8080/users';
const USER_API_BASE_URL_ADMIN = 'http://localhost:8080/admins';

class UserService {

    post(user){
        return axios.post(USER_API_BASE_URL + '/user', user);
    }

    put(user){
        return axios.put(USER_API_BASE_URL + '/user/' + jwt_decode(localStorage.getItem("jwt")).sub, user);
    }

    updateUser(username, user){
        return axios.put(USER_API_BASE_URL_ADMIN + '/user/' + username, user);
    }

    updateUserRole(username, role){
        return axios.put(USER_API_BASE_URL_ADMIN + '/user/' + username +'/role', role, {
            headers: {
                "content-type": "application/json"
            }
        });
    }

    get(){
        return axios.get(USER_API_BASE_URL + '/user/' + jwt_decode(localStorage.getItem("jwt")).sub);
    }

    readUser(username){
        return axios.get(USER_API_BASE_URL + '/user/' + username);
    }

    delete(){
        return axios.delete(USER_API_BASE_URL + '/user/' + jwt_decode(localStorage.getItem("jwt")).sub);
    }

    deleteUser(username){
        return axios.delete(USER_API_BASE_URL_ADMIN + '/user/' + username);
    }

}

export default new UserService();