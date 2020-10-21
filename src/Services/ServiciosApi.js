import axios from 'axios';




const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    //timeout: 1000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});


export default {

    ///   USERS
    GetUsers() {
        return instance.get('user');
    },
    GetOneUser(id) {
        return instance.get(`user/${id}`);
    },
    UpdateUser(ObjectJson, id) {
        return instance.put(`user/${id}`, ObjectJson);
    },
    InsertPostOnUser(ObjectJson, idUser) {
        return instance.put(`user/${idUser}`, ObjectJson);
    },
    DeleteUser(id) {
        return instance.delete(`user/${id}`);
    },
    Createuser(ObjectJson) {
        return instance.post('user', ObjectJson);
    },

    // GIGNIN AND SIGNUP
    SignIn(ObjectJson) {
        return instance.post('signin', ObjectJson);
    },

    /// POSTS
    GetPosts() {
        return instance.get('post');
    },
    CreatePost(ObjectJson) {
        return instance.post('post', ObjectJson);
    },
    DeletePosts(id) {
        return instance.delete(`post/${id}`);
    },
    GetOnePost(id) {
        return instance.get(`post/${id}`);
    },
    UpdatePost(ObjectJson, idpost) {
        return instance.put(`post/${idpost}`, ObjectJson);
    },

    //   COMENTARYS
    CreateCommentary(ObjectJson) {
        return instance.post('commentary', ObjectJson);
    },


    //  LIKES

};

instance.interceptors.request.use(config => {
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
        config.headers.Authorization = `Bearer ${TOKEN}`;

    }
    return config;
}, error => {
    return Promise.reject(error);
});


instance.interceptors.response.use(response => {
    return response;
}, error => {

    return Promise.reject(error);
});