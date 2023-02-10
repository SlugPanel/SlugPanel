import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        return sessionStorage.getItem("token");
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