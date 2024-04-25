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
    where:{id:parseInt(decodedToken.userId)}
  })
  if(result){
    req.mensual_tickets = result.mensual_tickets
    req.userId = decodedToken.userId;
    next()
  }else{
    const investor = await prisma.investor.findFirst({
      where:{
        id:parseInt(decodedToken.userId)
      }
    });
    if(!investor){
      req.admin = true
      next()
    } else{
      return res.status(403).json({msg:"Precondition Failed"});
    }
  }
}

const isValidInvestor = async (req, res, next) => {
 const decodedToken = jwtDecode(req.token)
  const result = await prisma.investor.findFirst({
    where:{id:parseInt(decodedToken.userId)}
  })
  console.log(result);
  if(result){
    req.mensual_votes = result.mensual_votes
    req.userId = decodedToken.userId;
    next()
  } else{
    const entrepeneur = await prisma.entrepeneur.findFirst({
      where:{
        id:parseInt(decodedToken.userId)
      }
    });
    if(!entrepeneur){
      req.admin = true
      next()
    }else{
      return res.status(403).json({msg:"Precondition Failed"});
    }
  }
}

const isAdmin = async (req, res, next) => {
  const decodedToken = jwtDecode(req.token);
  const responses = await Promise.all([
    prisma.user.findFirst({
      where:{id:parseInt(decodedToken.userId)}, select:{id},
    }),
    prisma.investor.findFirst({
      where:{id: parseInt(decodedToken.userId)}, select:{id},
    }),
    prisma.entrepeneur.findFirst({
      where:{id: parseInt(decodedToken.userId)}, select:{id},
    })
  ])

  if(responses[0] !== null && responses[1] === null && responses[2] === null){
    req.admin = true
    next()
  } else{
    return res.status(403).json({msg:"Forbibben"});
  }
}

const getUserFromToken = async(req,res,next) => {
  const decodedToken = jwtDecode(req.token);
  const responses = await Promise.all([
    prisma.user.findFirst({
      where:{id:parseInt(decodedToken.userId)}, select:{id:true},
    }),
    prisma.investor.findFirst({
      where:{id: parseInt(decodedToken.userId)}, select:{id:true},
    }),
    prisma.entrepeneur.findFirst({
      where:{id: parseInt(decodedToken.userId)}, select:{id:true},
    })
  ])

  req.userId = decodedToken.userId
  if(responses[1]){
    req.userType = "Investor"
  } else if( responses[2]){
    req.userType = "Entrepreneur"
  } else{
    req.userType = "Admin"
  }
  next()
}

module.exports = {
  parseToken,
  isValidToken,
  isValidEntrepreneur,
  isValidInvestor,
  isAdmin,
  getUserFromToken,
}

