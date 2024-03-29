const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token) return res.status(400).json({msg: "Invaild Authentication"})

        jwt.verify(token, process.env.TOKEN_SECRET,(err, user)=>{
            if(err) return res.status(400).json({msg: "Authorization not vaild."})

            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth;