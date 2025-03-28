import { axiosInstance } from '../helper/axios-config';

const getTipos = () => {
    return axiosInstance.get('tipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getTipoById = (tipoId) => {
    return axiosInstance.get(`tipo/${tipoId}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  };

const createTipos = (data) => {
    return axiosInstance.post('tipo', data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateTipos = (id, data) => {
    return axiosInstance.put(`tipo/${id}`, data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteTipos = (id, data) => {
    return axiosInstance.delete(`tipo/${id}`, data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}
export {
    getTipos, createTipos, updateTipos,deleteTipos,getTipoById
}