import { axiosInstance } from '../helper/axios-config';

const getMedias = () => {
    return axiosInstance.get('media', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createMedias = (data) => {
    return axiosInstance.post('media', data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateMedias = (id, data) => {
    return axiosInstance.put(`media/${id}`, data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteMedias = (id, data) => {
    return axiosInstance.delete(`media/${id}`, data, { 
        headers: {
            'Content-type': 'application/json'
        }
    });
}
export {
    getMedias, createMedias, updateMedias, deleteMedias
}