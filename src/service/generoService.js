import { axiosInstance } from '../helper/axios-config';

const getGeneros = () => {
    return axiosInstance.get('genero', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getGeneroById = (generoId) => {
    return axiosInstance.get(`genero/${generoId}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  };


  const createGeneros = (data) => {
    return axiosInstance.post('genero', data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateGeneros = (id, data) => {
    return axiosInstance.put(`genero/${id}`, data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteGeneros = (id, data) => {
    return axiosInstance.delete(`genero/${id}`, data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}
export {
    getGeneros, createGeneros, updateGeneros,deleteGeneros,getGeneroById
}