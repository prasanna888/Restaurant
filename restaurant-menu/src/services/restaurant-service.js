import axios from "axios";
class RestaurantService {
    getRestaurant(lat, lon, distance) {        return axios            .get(`https://api.documenu.com/v2/restaurants/search/geo?lat=${lat}&lon=${lon}&distance=${distance}`)            .then(response => {                return response.data;            });    }
    searchByName(restaurantName) {        return axios            .get(`https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${restaurantName}&exact=true`)            .then(response => {                return response.data;            });    }
    getRestaurantDetails(id) {        return axios            .get("https://api.documenu.com/v2/restaurant/" + id)            .then(response => {                return response.data;            });    }
}
export default new RestaurantService();
