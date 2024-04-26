const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

const fetchUser = async (userIdString) => {
 const userId = parseInt(userIdString)
  const user =  await prisma.user.findFirst({
    where:{
      id: userId
    },
    select:{
      id:true,
      name:true,
      email:true,
      image:true,
      url:true,
    }
  })

  if(!user){
    return res.status(404).json({msg:`The user ${userId} dosen't exists`})
  }

  const entrepeneur = await prisma.entrepeneur.findFirst({
    where:{
      id:userId
    }
  })
  if(!entrepeneur){
    user.entrepeneur = false
    const investor = await prisma.investor.findFirst({
      where:{
        id:userId
      }
    })
    if(!investor){
      user.investor = false
    }else{
      console.log(investor);
      user.investor = true
      user.tickets = investor.mensual_votes
    }
  }else{
    user.entrepeneur=true
    user.tickets = entrepeneur.mensual_tickets
  }
  return user
}

exports.getUser = asyncHandler( async (req, res, next)=>{

  const user = await fetchUser(req.params.userId)

  return res.status(200).json({userData:user})
})

exports.getAllUsers = asyncHandler( async (req, res, next)=>{

  const allUsersid = await prisma.user.findMany({
    select:{id:true}
  });
  console.log(allUsersid);
  const allUser = await Promise.all(
    allUsersid.map( async userId => {
      return await fetchUser(userId.id)
    } 
  ));

  const allUserWIthoutAdmins = allUser.filter(user => user.investor || user.entrepeneur)

  return res.status(200).json({ users:allUserWIthoutAdmins })
})

exports.getAllEntrepreneurs = asyncHandler( async (req,res,next) =>{
  const entrepreneurs = await prisma.entrepeneur.findMany({})
  return res.status(200).json(entrepreneurs)
})

exports.getAllInvestors = asyncHandler( async ( req, res, next) => {
  console.log("here");
  const investors = await prisma.investor.findMany({});
  return res.status(200).json(investors)
})

exports.getUserVotes = asyncHandler( async (req, res, next)=>{
  const user = await prisma.investor.findFirst({
    where:{
      id:parseInt(req.params.userId)
    }
  })

  if(!user){
    return res.status(404).json({msg:`The user ${req.params.userId} dosen't exits`})
  }
  const votes = await prisma.vote.findMany({
    where:{
      userId:user.id
    }
  })
  return res.status(200).json({votes})
})
exports.updateUser = [
  body("name")
  .optional()
  .trim()
  .isLength({min:1, max:56})
  .withMessage("Invalid User length"),
  body("email")
  .optional()
  .trim()
  .isEmail()
  .withMessage("Invalid email"),
  body("imageUrl")
  .optional()
  .trim()
  .isURL()
  .withMessage("Invalid Url"),
  body("baned")
  .optional()
  .isBoolean()
  .withMessage("Invalid baned option"),
  asyncHandler( async ( req, res, next ) => {
    const result = validationResult(req);
    console.log(result.array()[0]);
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0].msg});
    }

  const userToUpdate = await prisma.user.findFirst({
    where:{
      id:parseInt(req.params.userId)
    }
  })

  if(!userToUpdate){
    return res.status(404).json({msg:`The user ${req.params.userId} dosen't exits`})
  }

  const baned = req.body.baned 
    ? req.body.baned === "true"
    : userToUpdate.baned

  const newUserData = {
    name: req.body.name ?? userToUpdate.name,
    email: req.body.email ?? userToUpdate.email,
    image: req.body.imageUrl ?? userToUpdate.image,
    baned,
  }

  if(req.userType !== "Admin" && (parseInt(req.userId) === parseInt(req.params.userId))){
    await prisma.user.update({
      where:{
        id: parseInt(req.params.userId)
      },
      data:newUserData
    })
    return res.status(200).json({msg:`User ${req.params.userId} updated correctly`})
  }else if (req.userType === "Admin"){
     await prisma.user.update({
      where:{
        id: parseInt(req.params.userId)
      },
      data:newUserData
    })
    return res.status(200).json({msg:`User ${req.params.userId} updated correctly`})
  }

  return res.status(403).json({msg:`you cannot update other's account`})

  })
]

exports.deleteUser = asyncHandler( async (req,res,next) => {
  const userToDelete = await prisma.user.findFirst({
    where:{
      id:parseInt(req.params.userId)
    }
  })

  if(!userToDelete){
    return res.status(404).json({msg:`The user ${req.params.userId} dosen't exits`})
  }

  //No me acuerdo se se borra en casacada
  if(req.userType !== "Admin"){
    if(req.userType === "Investor"){
      console.log("borrar en investor");
    }
    else {
      console.log("borrar en entrepreneur")
    }
  }

  if(req.userType !== "Admin" && (parseInt(req.userId) === parseInt(req.params.userId))){
    await prisma.user.delete({
      where:{
        id: parseInt(req.params.userId)
      }
    })
    return res.status(200).json({msg:`User ${req.params.userId} deleted correctly`})
  }else if (req.userType === "Admin"){
     await prisma.user.delete({
      where:{
        id: parseInt(req.params.userId)
      }
    })
    return res.status(200).json({msg:`User ${req.params.userId} deleted correctly`})
  }

  return res.status(403).json({msg:`you cannot delete other's account`})

})