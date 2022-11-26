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

export const registerConfirmation = async (id, email, password) => {

    let body = {
        "id": id,
        "email": email, 
        "password": password
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_USERCONFIRMATION,
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

export const passwordRecovery = async (email) => {

    let body = {
        "username": email
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_PASSWORDRECOVERY,
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

export const passwordRecoveryConfirmation = async (username, token, password) => {

    let body = {
        "username": username,
        "token": token,
        "password": password
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_PASSWORDRECOVERYCONFIRMATION,
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

export const loginSession = async (token) => {

    let body = {
        "token": token
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_LOGINSESSION,
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

export const getTournamentsAdmin = async (token) => {

    try {
        const data = await axios({
            method: "GET",
            url: environment+process.env.REACT_APP_API_ENDPOINT_TOURNAMENTADMIN,
            headers:{
                "Content-Type": "application/json",
                "token": `${token}`
            }
        })
        return data
    } catch (err) {
        return err;
    }

}

export const getTournamentsPlayer = async (token) => {

    try {
        const data = await axios({
            method: "GET",
            url: environment+process.env.REACT_APP_API_ENDPOINT_TOURNAMENTPLAYER,
            headers:{
                "Content-Type": "application/json",
                "token": `${token}`
            }
        })
        return data
    } catch (err) {
        return err;
    }

}

export const createTournament = async (token, cantidadjugadores, liga, nombre, jugadores) => {

    let body = {
        cantidadjugadores,
        liga,
        nombre
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_CREATETOURNAMENT,
            headers:{
                "Content-Type": "application/json",
                "token": `${token}`
            },
            data: body
        })
        return data
    } catch (err) {
        return err;
    }

}

export const getOpenTournamentsPlayer = async (token, params) => {

    try {
        const data = await axios({
            method: "GET",
            url: environment+process.env.REACT_APP_API_ENDPOINT_GETOPENTOURNAMENTS+params,
            headers:{
                "Content-Type": "application/json",
                "token": `${token}`
            }
        })
        return data
    } catch (err) {
        return err;
    }

}

export const registerPlayerInOpenTournament = async (token, id) => {

    let body = {
        id
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_REGISTERPLAYERINTOURNAMENT,
            headers:{
                "Content-Type": "application/json",
                "token": `${token}`
            },
            data: body
        })
        return data
    } catch (err) {
        return err;
    }

}

export const AdminOpenTournament = async (token, id) => {

    let body = {
        id
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_OPENTOURNAMENT,
            headers:{
                "Content-Type": "application/json",
                "token": `${token}`
            },
            data: body
        })
        return data
    } catch (err) {
        return err;
    }

}

export const adminTournamentDetail = async (token, id) => {

    let body = {
        id
    }

    try {
        const data = await axios({
            method: "POST",
            url: environment+process.env.REACT_APP_API_ENDPOINT_TOURNAMENTDETAIL,
            headers:{
                "Content-Type": "application/json",
                "token": `${token}`
            },
            data: body
        })
        return data
    } catch (err) {
        return err;
    }

}