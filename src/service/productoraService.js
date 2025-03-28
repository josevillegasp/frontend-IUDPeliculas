import { axiosInstance } from '../helper/axios-config';

const getProductoras = () => {
    return axiosInstance.get('productora', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getProductoraById = (productoraId) => {
    return axiosInstance.get(`productora/${productoraId}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  };

const createProductoras = (data) => {
    return axiosInstance.post('productora', data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateProductoras = (id, data) => {
    return axiosInstance.put(`productora/${id}`, data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteProductoras = (id, data) => {
    return axiosInstance.delete(`productora/${id}`, data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}
export {
    getProductoras, createProductoras, updateProductoras,deleteProductoras,getProductoraById
}