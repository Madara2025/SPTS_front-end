import axios from 'axios';

const tokenVerify = async (navigate) => {
    const token = localStorage.getItem('token');
    if (!token){
        console.log("No token found");
        return false;
    }


    try{
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/verify-token`, {
            headers: {
                Authorization: 'Bearer ${token}'
            }
        });

        // console.log("Token is valid:", response.data);
        return true; 

    } catch (error) {
        console.error("Token verification failed:", error.response?.data || error.message);
        alert("Session expired. Please login again.");
        localStorage.removeItem('token');
        return false; 
    }
};

export default tokenVerify;