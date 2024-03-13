import axios from 'axios';

const USER_API_URL = "http://localhost:9003/user";
const FILE_API_URL = "http://localhost:9003/file";

class UserService {

    userCreate(user) {
        return axios.post(USER_API_URL + "/create", user);
    }
    userLogin(formData) {
        console.log(formData);
        return axios.post(USER_API_URL + "/login", formData);
    }

    UserById(userId) {
        return axios.get(USER_API_URL + "/userId", userId);
    }

    getAllFiles() {
        return axios.get(FILE_API_URL + "/getAll");
    }

    viewFile(fileName) {
        return axios.get(`${FILE_API_URL}/view/${fileName}`, {
          responseType: 'blob' // Set response type to blob for file downloads
        });
    }
    
    downloadFile(fileName) {
        return axios.get(`${FILE_API_URL}/download/${fileName}`, {
          responseType: 'blob' // Set response type to blob for file downloads
        });
    }

    uploadFile(formData) {
       

        return axios.post(FILE_API_URL + "/upload/1", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    deleteFile(id, fileName) {
        if (id) {
            return axios.delete(FILE_API_URL + "/delete", {
                params: { id: id }
            });
        } else if (fileName) {
            return axios.delete(FILE_API_URL + "/delete", {
                params: { fileName: fileName }
            });
        } else {
            return Promise.reject("Invalid parameters provided.");
        }
    }

}

export default new UserService();
