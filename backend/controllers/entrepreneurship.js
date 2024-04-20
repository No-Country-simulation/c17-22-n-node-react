const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

const isFromLastMonth = (entrepreneurshipDate) => {
  console.log({
    entrepreneurshipDate,
    type: typeof entrepreneurshipDate
  });
  const today = new Date();
  if(entrepreneurshipDate.getMonth() < 11){
    return entrepreneurshipDate.getMonth() < today.getMonth()
  } else{
    return today.getMonth() === 0
  }
}

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

exports.addEntrepreneurship = [
  body("name")
  .trim()
  .isLength({min:1, max:120})
  .withMessage("name should be not empty"),
  body("description")
  .trim()
  .isLength({max:500})
  .withMessage("Description to long"),
  body("categoryId")
  .toInt()
  .isInt({min:1})
  .withMessage("Category should be provided"),
  body("subcategoryId")
  .toInt()
  .isInt({min:1})
  .withMessage("SubCategory should be provided"),
  body("imageUrl")
  .optional()
  .trim()
  .isURL()
  .withMessage("Ivalid URL provided"),
  asyncHandler(async (req, res, next ) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0]});
    }

    const userId = req.admin ? req.body.entrepeneurId : req.userId;
    const user = await prisma.entrepeneur.findFirst({
      where:{
        id:parseInt(userId)
      }
    })

    if(!user) {
      return res.status(404).json({msg: `Entrepreneur ${userId} not found`})
    }

    if(req.mensual_tickets === 0){
      const lastEntrepreneurshipCreated = await prisma.entrepreneurship.findMany({
        take:1,
        orderBy:{creation_date:"desc"},
        where:{entrepeneurId:parseInt(userId)},
      });
      if(isFromLastMonth(lastEntrepreneurshipCreated.creation_date)){
        // add new tickets
        await prisma.entrepeneur.update({
          where:{id:parseInt(userId)},
          data:{mensual_tickets: 9}
        });
      } else {
        return res.status(403).json({msg:"Mountly tickets used"})
      }
    }
    // create new entrepreneurship
    const entrepreneurshipData = {
      name:req.body.name,
      description:req.body.description !== "" ? req.body.description : "",
      categoryId: req.body.subcategoryId,
      subcategoryId: req.body.subcategoryId,
      imageUrl: req.body.imageUrl,
      entrepeneurId: parseInt(userId),
      meta:{}
    }

    const category = await prisma.category.findFirst({
      where:{
        id:req.body.categoryId
      }
    })

    if(!category){
      return res.status(400).json({msg:`Invalid data ${ req.body.categoryId}`});
    }
    
    const subcategory = await prisma.subcategory.findFirst({
      where:{
        id:req.body.subcategoryId,
        categoryId:req.body.subcategoryId,
      }
    });

    if(!subcategory){
      return res.status(400).json({msg:`Invalid data ${req.body.subcategoryId}`})
    }

    const entrepreneurship = await prisma.entrepreneurship.create({
      data: entrepreneurshipData
    })

    return res.status(200).json({
      msg:"Entreprenuership created correctly",
      entrepreneurshipId: entrepreneurship.id,
    })
  })
]

exports.addVote = [
  body("isPositive")
  .isBoolean()
  .withMessage("Invalid value for vote"),
  body("userId")
  .optional()
  .trim()
  .toInt({min:1})
  .isInt()
  .withMessage("Invalid userId provided"),
  asyncHandler( async ( req,res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0]});
    }

    const entrepreneurship = await prisma.entrepreneurship.findFirst({
      where:parseInt(req.params.entrepreneurshipId)
    })

    if(!entrepreneurship){
      return res.status(404).json({msg:`Entrepreneurship ${req.params.entrepreneurshipId} not found`})
    }

    const userId = req.admin ? req.body.investorId : req.userId;
    const user = await prisma.investor.findFirst({
      where:{
        id:parseInt(userId)
      }
    })

    if(!user) {
      return res.status(404).json({msg: `Investor ${userId} not found`})
    }

    if(req.mensual_votes === 0){
      const lastvotePosted = await prisma.vote.findMany({
        take:1,
        orderBy:{
          created:"desc"
        },
        where:{
          id:parseInt(userId),
          entrepreneurshipId:parseInt(req.params.entrepreneurshipId)
        }
      });
      if(isFromLastMonth(lastvotePosted.created)){
          // add new tickets
        await prisma.investor.update({
          where:{id:parseInt(userId)},
          data:{mensual_votes: 9}
        });
      } else {
        return res.status(403).json({msg:"Mountly votes used"})
      }
    }

    const voteData = {
      value : req.body.isPositive,
      entrepreneurshipId: parseInt(req.params.entrepreneurshipId),
      userId: userId
    }

    const newVote = await prisma.vote.create({
      data:voteData
    })

    return res.status(200).json({
      msg:"",
      voteId: userId,
    })

  })
]

exports.updateEntrepreneurship = []

exports.updateVote = []

exports.deleteEntrepreneurship = asyncHandler( async (req,res,next) => {
    
    const entrepreneurship = await prisma.entrepreneurship.findFirst({
      where:{
        id:parseInt(req.params.entrepreneurshipId)
      }
    })
    
    if(!req.admin && entrepreneurship.entrepeneurId !== parseInt(req.userId)){  
      return res.status(403).json({msg:"You cannot delete a entrepreneurship that is not your's "})
    }

    await prisma.entrepreneurship.delete({
      where:{
        id:entrepreneurship.id
      }
    })
    return res.status(200).json({msg:`The entrepreneurship ${entrepreneurship.id} was deleted correctly`})
})

exports.deleteAllVotes = asyncHandler(async (req,res,next) => {
  const entrepreneurship = await prisma.entrepreneurship.findFirst({
    where:{
      id:parseInt(req.params.entrepreneurshipId)
    }
  });

  if(!entrepreneurship) {
    return res.status(404).json({msg:`Entrepreneurship ${entrepreneurshipId} was not found`});
  }
  
  const deletedVotes = await prisma.vote.deleteMany({
    where:{
      entrepreneurshipId:parseInt(req.params.entrepreneurshipId)
    }
  })

  return res.status(200).json({msg:`All votes deleted correctly`})

})

exports.deleteVote = asyncHandler(async (req,res,next) => {

  if (req.userId !== req.params.voteId){
    return res.status(403).json({msg:`You cannot delete a vote that is not your's`})
  }

    const investor = prisma.investor.findFirst({where:{id: parseInt(req.params.voteId)}})
    if(!investor) {
      return res.status(404).json({msg:`The user ${req.params.voteId} was not found`});
    }
    const entrepreneurship = prisma.entrepreneurship.findFirst({where:{id: parseInt(req.params.entrepreneurshipId)}})
    if(!entrepreneurship){
      return res.status(404).json({msg:`The Entrepreneurship ${req.params.entrepreneurshipId} was not found`});
    }

    await prisma.vote.delete({
      where:{
        AND:[
          {entrepreneurshipId:parseInt(req.params.entrepreneurshipId)},
          {investorId: parseInt(req.params.voteId)}          
        ]
      }
    })
    return res.status(200).json({msg:"vote deleted correctly"});
})

