const jwt = require('jsonwebtoken');

class jwtController {

    static getData(request, response) {

        let token = request.headers.access_token;

        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                response.status(500).json({ error : err});
                return;
            }

            response.json( { data : decoded } );
        });

    }

}


module.exports = jwtController;