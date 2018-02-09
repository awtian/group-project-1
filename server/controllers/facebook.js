const FB = require('fb');
const userModel = require('../models/user')
const jwt = require('jsonwebtoken');

FB.options({ version: 'v2.8' });

class facebookController {

    static getData(request, response) {
        
        console.log('controllersss');
        console.log(request.headers.access_token);

        FB.setAccessToken(request.headers.access_token);
        FB.api(
            `/me`,
            { fields: ['id', 'name', 'email', 'location', 'locale', 'picture'] },
            function (userResponse) {
                if (!userResponse || userResponse.error) {
                    response.send(!userResponse ? 'error occurred' : userResponse.error);
                    return;
                }

                let userData = userResponse;

                FB.api(
                `/${userResponse.id}/music`,
                function (userMusic) {                    
                    
                    let arrMusic = [];

                    if (!userMusic || userMusic.error) {
                       response.send(!userMusic ? 'error occurred' : userMusic.error);
                       return;
                    }

                    userMusic.data.forEach( function(item){
                       arrMusic.push(item.name)
                    });

                    userModel.findOneOrCreate(
                        {
                            email: userData.email
                        }, 
                        {
                            name : userData.name,
                            email: userData.email, 
                            language: userData.locale.slice(0, 2), 
                            countryCode: userData.locale.slice(3, 5),
                            music: arrMusic
                        }, 
                        function (err, userdbdata) {
                            if(err){
                                response.send(err);
                                return;
                            }

                            var token = jwt.sign({
                                user : {
                                    name : userdbdata.name,
                                    email : userdbdata.email
                                }
                            }, 
                            process.env.SECRET_KEY);

                            response.send({token : token})
                        })
                    
                });

            }
        );
    }

}


module.exports = facebookController;