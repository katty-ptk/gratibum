import axios from 'axios';

class AuthService {
    doLogin(email, password){
        const formData = {
            email: email,
            password: password
        };
        axios.post("http://www.vecinulvirtual.ro/liw/api/auth/login.php", {
            data: formData
        })
        .then(function (response) {
          console.log(response);
        });
    }
}

export default AuthService;