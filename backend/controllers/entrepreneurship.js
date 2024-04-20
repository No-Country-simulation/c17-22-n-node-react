const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

exports.getAll =asyncHandler(async (req,res,next) => {
  const entrepreneurships = await prisma.entrepreneurship.findMany();
  return res.status(200).json({entrepreneurships});
});

exports.getOne = asyncHandler( async (req,res,next) => {
  const entrepreneurshipId = parseInt(req.params.entrepreneurshipId);
  const entrepreneurship = await prisma.entrepreneurship.findFirst({
    where:{id: entrepreneurshipId},
    select:{
      id:true,
      description:true,
      entrepeneurId:true,
    }
  })
  if(!entrepreneurship){
    return res.status(404).json({msg:`entrepreneurship ${entrepreneurshipId} not found`})
  }

  const entrepreneurshipVotes = await prisma.vote.findMany({
    where:{entrepreneurshipId},
    select:{value:true}
  })

  const cant_positive = entrepreneurshipVotes.filter(vote => vote.value === true).length;
  const cant_negative = entrepreneurshipVotes.length - cant_positive  

  entrepreneurship.votes = {
   cant_positive,
   cant_negative 
  }

  return res.status(200).json({entrepreneurship})
})

exports.getVotes = asyncHandler(async (req,res,next) => {
  const entrepreneurshipId = parseInt(req.params.entrepreneurshipId);
  const entrepreneurship = await prisma.entrepreneurship.findFirst({
    where:{id: entrepreneurshipId},
    select:{
      id:true,
    }
  })
  if(!entrepreneurship){
    return res.status(404).json({msg:`entrepreneurship ${entrepreneurshipId} not found`})
  }

  const votes = await prisma.vote.findMany({
    where:{entrepreneurshipId},
  })
  return res.status(200).json({votes})
})

exports.getVote = asyncHandler( async (req,res,next) => {
  const entrepreneurshipId = parseInt(req.params.entrepreneurshipId);
  const userId = parseInt(req.params.voteId)
  const entrepreneurship = await prisma.entrepreneurship.findFirst({
    where:{id: entrepreneurshipId},
    select:{
      id:true,
    }
  })
  if(!entrepreneurship){
    return res.status(404).json({msg:`entrepreneurship ${entrepreneurshipId} not found`})
  }

  const vote = await prisma.vote.findMany({
    where:{entrepreneurshipId, userId},
  })
  return res.status(200).json({vote})

})

