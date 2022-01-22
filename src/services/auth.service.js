import axios from 'axios';

class AuthService {
    doSignUp( first_name, email, password, callbackFunction ) {
        const signUpFormData = {
            first_name: first_name,
            email: email,
            password: password
        };

        axios.post("http://www.vecinulvirtual.ro/liw/api/auth/register.php", signUpFormData)
            .then( function( response ) {
                alert("sign up complete");

                const idToken = response.data.idToken;
                const refreshToken = response.data.refreshToken;

                callbackFunction({
                    success: true,
                    data: {
                        first_name: first_name,
                        email: email,
                        idtoken: idToken,
                        refreshToken: refreshToken
                    }
                });
            })
            .catch( err => {
                // alert('an error occured');

                callbackFunction({
                    success: false,
                    data: err.response.data
                });
            });
    }

    doLogin(email, password, callbackFunction){
        const loginFormData = {
            email: email,
            password: password
        };
        axios.post("http://www.vecinulvirtual.ro/liw/api/auth/login.php", loginFormData)
        .then(function (response) {
          // save the idtoken for further requests
          const idToken = response.data.idToken;

          // save the refresh token for when the id token expires.
          const refreshToken = response.data.refreshToken;

          callbackFunction({
              success: true,
              data: {
                  email: email,
                  idtoken: idToken,
                  refreshToken: refreshToken
              }
          });
        })
        .catch(function (err) {
            callbackFunction({
                success: false,
                data: err.response.data
            });
        });
    }
}

export default AuthService;