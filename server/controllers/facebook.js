var FB = require('fb');
FB.options({ version: 'v2.8' });

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
                    if (!userMusic || userMusic.error) {
                        response.send(!userMusic ? 'error occurred' : userMusic.error);
                        return;
                    }

                    response.send( {
                        user : userData,
                        music : userMusic
                    });
                    
                });

            }
        );
    }

}

module.exports = newsController;