import axios from 'axios';

class AuthService {
    doLogin(email, password, callbackFunction){
        const formData = {
            email: email,
            password: password
        };
        axios.post("http://www.vecinulvirtual.ro/liw/api/auth/login.php", formData)
        .then(function (response) {
          console.log(response.data);
          // save the idtoken for further requests
          console.log( "id token : "+response.data.idToken );
          // save the refresh token for when the id token expires.
          console.log( "refresh token : "+response.data.refreshToken );
          callbackFunction({
              success: true,
              data: {
                  email: email,
                  idtoken: response.data.idToken,
                  refreshToken: response.data.refreshToken
              }
          });
        })
        .catch(function (err) {
            console.log(err.response.data);
            callbackFunction({
                success: false,
                data: err.response.data
            });
        });
    }
}

export default AuthService;