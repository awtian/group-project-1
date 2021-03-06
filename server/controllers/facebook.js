const FB = require('fb');
const userModel = require('../models/user')
const jwt = require('jsonwebtoken');

FB.options({ version: 'v2.8' });

class facebookController {

    static getData(request, response) {
        
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
                    console.log('userMusic');
                    console.log(userMusic);
                    
                    let arrMusic = [];

                    if (!userMusic || userMusic.error) {
                       response.send(!userMusic ? 'error occurred' : userMusic.error);
                       return;
                    }

                    userMusic.data.forEach( function(item){
                       arrMusic.push(item.name)
                    });

                    console.log('arrMusic');
                    console.log(arrMusic);

                    userModel.findOneOrCreate(
                        {
                            email: userData.email
                        }, 
                        {   
                            fbid: userData.id,
                            name : userData.name,
                            email: userData.email, 
                            picture: userData.picture.data.url,
                            language: userData.locale.slice(0, 2), 
                            countryCode: userData.locale.slice(3, 5),
                            music: arrMusic
                        }, 
                        function (err, userdbdata) {
                            if(err){

                                console.log(err);
                                
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

                            console.log('token');                            
                            console.log(token);                            
                            response.send({token : token})
                        })
                    
                });

            }
        );
    }

}


module.exports = facebookController;