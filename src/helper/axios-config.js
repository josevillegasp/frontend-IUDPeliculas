import axios from "axios";

const axiosInstance=axios.create({
    baseURL:'https://peliculasiud-xi6x.onrender.com/'
})

export {
    axiosInstance
}
