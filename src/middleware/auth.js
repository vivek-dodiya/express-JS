import jwt from 'jsonwebtoken';
export const auth = (req,res,next) =>{
    let token ;
    if (req.headers.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        try{
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            req.user = decoded;
            console.log(decoded)
            return next();
        } catch(err){
            return res.status(401).json({msg:'Invalid Token'});
        }
    }
    next()
}

// export const auth = (req, res, next) => {
//     let token;
//     if (req.headers.authorization?.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//         try {
//             const decoded = jwt.verify(token, process.env.SECRET_KEY);
//             console.log(decoded);
//             req.user = decoded; 
//             return next(); 
//         } catch (err) {
//             return res.status(401).json({ msg: 'Invalid Token' }); 
//         }
//     } else {
//         return res.status(401).json({ msg: 'Authorization header missing or invalid' });
//     }
// };