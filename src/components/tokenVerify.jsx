import axios from 'axios';

const VerifyToken = async (navigate) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log("No token found.");
        return false;
    }

    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/verify-token`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // console.log("Token is valid:", response.data);
        return true; 

    } catch (error) {
        console.error("Token verification failed:", error.response?.data || error.message);
        alert("Session expired. Please login again.");
        localStorage.removeItem('token');
        if (navigate) {
            navigate('/login'); // Redirect to login on token verification failure
        }
        return false; 
    }
};

export default VerifyToken;