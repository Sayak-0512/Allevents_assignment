const User=require('../models/user')
const {OAuth2Client}=require('google-auth-library')
const jwt=require('jsonwebtoken');
const client=new OAuth2Client("367170922771-sb5lb6r4d8tmsejf8v24gka1t8i88016.apps.googleusercontent.com")

exports.googlelogin= (req,res) =>{
    const {tokenId}=req.body;

    client.verifyIdToken({idToken: tokenId, audience: "367170922771-sb5lb6r4d8tmsejf8v24gka1t8i88016.apps.googleusercontent.com"}).then(response =>{
        // console.log(response.payload);
        const {email_verified, name, email, picture}=response.payload;
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Something went wrong. Try again."
                    })
                }
                else{
                    if(user){
                        const token=jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
                        const {_id, name, email, picture}=user;

                        res.json({
                            token,
                            user: {_id, name, email, picture}
                        })
                    }else{
                        let newUser=new User({name, email, picture});
                        newUser.save((err, data) => {
                            if(err){
                                return res.status(400).json({
                                    error: "Something went wrong. Try again."
                                })
                            }
                            const token=jwt.sign({_id: data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
                            const {_id, name, email, picture}=newUser;
    
                            res.json({
                                token,
                                user: {_id, name, email, picture}
                            })
                        })
                    }
                }
            })
        }
    })
    console.log();
}

exports.verifytoken=(req,res)=>{
    const {token}=req.body;
    jwt.verify(token, process.env.JWT_SIGNIN_KEY, function(err, decoded) {
        if(err)
        {
            console.log(err);
            res.status(403).json({
                message: "Not verified"
            })
        }
        else
        {
            if(decoded){
                res.status(200).json({
                    message: "Successfully verified",
                    response: decoded
                })
            }
           
        }
      });
}

exports.getpicture=(req,res)=>{
    // console.log(req.query.id);
    User.findOne({_id: req.query.id}, function(err,data){
        if(err)
        res.status(400).json({
            message: err
        })
        else if(data){
            res.status(200).json({
                picture: data.picture,
                name: data.name
            })
        }
    })
}