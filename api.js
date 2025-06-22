import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000/" : "http://localhost:3000/";


export const fetchCoffees = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}kahveler`);
        return response.data;
    } catch (error) {
        console.error("Error fetching coffees:", error);
        throw error;
    }
}

export const fetchCoffeeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}kahveler/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching coffee with id ${id}:`, error);
        throw error;
    }
}

export const fethchLikedCoffees = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}begenilenler`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching liked coffees:", error);
        throw error;
    }
}

export const addLikedCoffee = async (id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}begenilenler/toggle`, {   kahve_id: id });
        return response.data;
    } catch (error) {
        console.error(`Error adding coffee with id ${id} to liked coffees:`, error);
        throw error;
    }
}
