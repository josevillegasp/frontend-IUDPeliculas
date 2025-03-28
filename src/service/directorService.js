import{axiosInstance} from '../helper/axios-config';

const getDirectores = () => {
    return axiosInstance.get('director', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getDirectorById = (directorId) => {
    return axiosInstance.get(`director/${directorId}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  };

const createDirectores = (data) => {
    return axiosInstance.post('director', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateDirectores = (directorId, data) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteDirectores = (directorId, data) => {
    return axiosInstance.delete(`director/${directorId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getDirectores, createDirectores, updateDirectores,deleteDirectores,getDirectorById
}  