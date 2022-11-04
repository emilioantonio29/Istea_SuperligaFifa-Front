import axios from "axios";

let environment = process.env.NODE_ENV == "development" ? process.env.REACT_APP_LOCALAPI : process.env.REACT_APP_API;

export const generalAxios = async (method, endpoint, headers, body) => {
    try {
        const { data } = await axios({
            method: method,
            url: environment+endpoint,
            headers: headers,
            data: body
        })
        return data
    } catch (err) {
        return err;
    }
};

export const login = async (username, password) => {

    let body = {
        "username": username,
        "password": password
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_LOGIN,
            headers:{
                "Content-Type": "application/json"
            },
            data: body
        })
        return data
    } catch (err) {
        return err;
    }

}

export const register = async (username, favoriteteam, lastname, name, tac) => {

    let body = {
        "username": username,
        "favoriteteam": favoriteteam, 
        "lastname": lastname,
        "name": name,
        "tac": tac
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_CREATEUSER,
            headers:{
                "Content-Type": "application/json"
            },
            data: body
        })
        return data
    } catch (err) {
        return err;
    }

}