var FB = require('fb');
FB.options({ version: 'v2.8' });
const userModel = require('../models/user')

class newsController {

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
                    
                    let arrMusic = [];

                    if (!userMusic || userMusic.error) {
                       response.send(!userMusic ? 'error occurred' : userMusic.error);
                       return;
                    }

                    userMusic.data.forEach( function(item){
                       arrMusic.push(item.name)
                    });

                    userModel.findOneOrCreate(
                        {email: userData.email}, 
                        {email: userData.email, 
                        language: userData.locale.slice(0, 2), 
                        countryCode: userData.locale.slice(3, 5),
                        music: arrMusic}, 
                        (err, userdbdata) => {
                            err? response.send(err) : response.send({userdbdata})
                        })
                    


                    // response.send( {
                    //     user : userData,
                    //     music : userMusic
                    // });
                    
                });

            }
        );
    }

}


module.exports = newsController;