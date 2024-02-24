var jwt = require('jsonwebtoken');
const JWT_SECRET = 'adityaisgood';

// a middleway 
const fetchuser = (req, res, next) => {
    // get the user from jwt token and add id
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Access Denied" })
    }


    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()

    } catch (error) {
        res.status(401).send({error:"Access denied"})

    }
}

module.exports = fetchuser;
