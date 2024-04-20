const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const parseToken = (req,res,next) =>{
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1]
    req.token = bearerToken;
    next()
  } else{
    res.status(403).json({msg:"Invalid Authorizations Header"})
  }
}


const isValidToken = (req,res,next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if(err){
      return res.status(403).json({msg:`Validation Fail`})
    }else{
     next() 
    }
  })
}

const isValidEntrepreneur = async (req,res, next) => {
  const decodedToken = jwtDecode(req.token)
  const result = await prisma.entrepeneur.findFirst({
    where:{user:decodedToken.userId}
  })
  if(result){
    next()
  } else{
    return res.status(403).json({msg:"Precondition Failed"});
  }
}

const isValidInvestor = async (req, res, next) => {
 const decodedToken = jwtDecode(req.token)
  const result = await prisma.investor.findFirst({
    where:{user:decodedToken.userId}
  })
  if(result){
    next()
  } else{
    return res.status(403).json({msg:"Precondition Failed"});
  }
}

const isAdmin = async (req, res, next) => {
  const decodedToken = jwtDecode(req.token);
  const responses = await Promise.all([
    prisma.user.findFirst({
      where:{id:decodedToken.userId}, data:{id},
    }),
    prisma.investor.findFirst({
      where:{user: decodedToken.userId}, data:{id},
    }),
    prisma.entrepeneur.findFirst({
      where:{user: decodedToken.userId}, data:{id},
    })
  ])

  if(responses[0] !== null && responses[1] === null && responses[2] === null){
    next()
  } else{
    return res.status(403).json({msg:"Forbibben"});
  }
}

module.exports = {
  parseToken,
  isValidToken,
  isValidEntrepreneur,
  isValidInvestor,
  isAdmin,
}

