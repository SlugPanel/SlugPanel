import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        const userToken = tokenString;
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem("token", userToken.token);
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}