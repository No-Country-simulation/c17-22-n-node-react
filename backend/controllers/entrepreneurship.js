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
  const entrepreneurships = await prisma.entrepreneurship.findMany({
    include:{
      Vote:true
    }
  });
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

  const totalVotes = {
   cant_positive,
   cant_negative 
  }
  console.log(totalVotes);

  return res.status(200).json({entrepreneurship, totalVotes})
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
    console.log(req.body);
    const result = validationResult(req);
    console.log({
      result
    })
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0]});
    }

    const userId = req.admin ? req.body.entrepreneurId : req.userId;
    const user = await prisma.entrepeneur.findFirst({
      where:{
        id:parseInt(userId)
      }
    })

    if(!user) {
      return res.status(404).json({msg: `Entrepreneur ${userId} not found`})
    }

    if(!req.admin && req.mensual_tickets === 0){
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
    } else if(!req.admin){
      await prisma.entrepeneur.update({
        where:{id:parseInt(userId)},
        data:{mensual_tickets:user.mensual_tickets - 1}
      })
    }
    // create new entrepreneurship
    const category = await prisma.category.findFirst({
      where:{
        id:req.body.categoryId
      }
    })
    
    if(!category){
      console.log(category)
      return res.status(400).json({msg:`Invalid Category ${ req.body.categoryId}`});
    }

    const subcategory = await prisma.subcategory.findFirst({
      where:{
        id:req.body.subcategoryId,
        categoryId:category.id,
      }
    });
    
    if(!subcategory){
      console.log(subcategory)
      return res.status(400).json({msg:`Invalid Subcategory ${req.body.subcategoryId}`})
    }
    
    const entrepreneurshipData = {
      name:req.body.name,
      description:req.body.description !== "" ? req.body.description : "",
      image: req.body.imageUrl,
      meta:[],
      entrepeneurId: user.id,
      subcategoryId: subcategory.id,
    }
    
    console.log(entrepreneurshipData);

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
      where:{
        id: parseInt(req.params.entrepreneurshipId)
      }
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

    if(!req.admin && req.mensual_votes === 0){
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
    } else if(!req.admin){
      await prisma.investor.update({
        where:{id:parseInt(userId)},
        data:{mensual_votes:user.mensual_votes - 1}
      })
    }

    const voteData = {
      value : req.body.isPositive === "trues",
      entrepreneurshipId: parseInt(req.params.entrepreneurshipId),
      userId: parseInt(userId)
    }

    const newVote = await prisma.vote.create({
      data:voteData
    })

    return res.status(200).json({
      msg:"THe user voted correctly",
      voteId: userId,
    })

  })
]

exports.updateEntrepreneurship = [
 body("name")
  .optional()
  .trim()
  .isLength({min:1, max:120})
  .withMessage("name should be not empty"),
  body("description")
  .optional()
  .trim()
  .isLength({max:500})
  .withMessage("Description to long"),
  body("categoryId")
  .optional()
  .toInt()
  .isInt({min:1})
  .withMessage("Category should be provided"),
  body("subcategoryId")
  .optional()
  .toInt()
  .isInt({min:1})
  .withMessage("SubCategory should be provided"),
  body("imageUrl")
  .optional()
  .trim()
  .isURL()
  .withMessage("Ivalid URL provided"),
  asyncHandler( async (req,res,next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0]});
    }

    const userId = req.admin ? req.body.entrepreneurId : req.userId;
    const user = await prisma.entrepeneur.findFirst({
      where:{
        id:parseInt(userId)
      }
    })
    if(!user){
      return res.status(400).json({msg:`The user ${userId} dosent exits`})
    }

    const entrepreneurship = await prisma.entrepreneurship.findFirst({
      where:{id:parseInt(req.params.entrepreneurshipId)}
    })

    if(!entrepreneurship){
      return res.status(400).json({msg:`The entrepreneurship ${entrepreneurship} dosent exits`})
    }

    if(req.body.subcategoryId && req.body.categoryId){
      
      const subcategory = await prisma.subcategory.findFirst({
        where:{
          AND:[
            {id:parseInt(req.body.subcategoryId)},
            {categoryId: parseInt(req.body.categoryId)}
          ]
        }
      })
      
      if(!subcategory){
        return res.status(400).json({msg:`The subcategory ${req.body.subcategoryId} in the category ${req.body.categoryId} could'y be found`});
      }
    }

    const newentrepreneurshipData = {
      name: req.body.name ?? entrepreneurship.name,
      description: req.body.description ?? entrepreneurship.description,
      imageUrl: req.body.imageUrl ?? entrepreneurship.imageUrl,
      subcategoryId: req.body.subcategoryId ? parseInt(req.body.subcategoryId) : entrepreneurship.subcategoryId,
    }

    await prisma.entrepreneurship.update({
      where:{
        id: parseInt(req.params.entrepreneurshipId)
      },
      data:newentrepreneurshipData
    });

    return res.status(200).json({msg:"ENtrepreneurship updated correctly"})
  })
]

exports.updateVote = [
  body("isPositive")
  .optional()  
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

    const userId = req.admin ? req.body.investorId : req.userId;
   
    const user = await prisma.investor.findFirst({
      where:{
        id:parseInt(userId)
      }
    })
    if(!user){
      return res.status(400).json({msg:`The user ${userId} dosent exits`})
    }

    const entrepreneurship = await prisma.entrepreneurship.findFirst({
      where:{
        id:parseInt(req.params.entrepreneurshipId)
      }
    })
    if(!entrepreneurship){
      return res.status(400).json({msg:`The Entrepreneurship ${req.params.entrepreneurshipId} dosent exits`})
    }

    const vote = await prisma.vote.findFirst({
      where:{
        userId:parseInt(userId),
        entrepreneurshipId:parseInt(req.params.entrepreneurshipId)
      }
    })
    if(!vote){
      return res.status(404).json({msg:`The Vote ${req.params.voteId} dosen't exists`})
    }

    await prisma.vote.update({
      where:{
        userId_entrepreneurshipId:{
          userId:parseInt(userId),
          entrepreneurshipId: parseInt(req.params.entrepreneurshipId)
        }
      },
      data:{
        value: req.body.isPositive === "true"
      }
    })

    return res.status(200).json({msg:`the Vote ${req.params.voteId} was updated correctly`});

  })
]

//No me acuerdo si se borra en cascada
exports.deleteEntrepreneurship = asyncHandler( async (req,res,next) => {
    
    const entrepreneurship = await prisma.entrepreneurship.findFirst({
      where:{
        id:parseInt(req.params.entrepreneurshipId)
      }
    })
    
    if(!req.admin && entrepreneurship.entrepeneurId !== parseInt(req.userId)){  
      return res.status(403).json({msg:"You cannot delete a entrepreneurship that is not your's "})
    }

    await prisma.vote.deleteMany({
      where:{
        entrepreneurshipId:entrepreneurship.id
      }
    });

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
  
  await prisma.vote.deleteMany({
    where:{
      entrepreneurshipId:parseInt(req.params.entrepreneurshipId)
    }
  })

  return res.status(200).json({msg:`All votes deleted correctly`})

})

exports.deleteVote = asyncHandler(async (req,res,next) => {

  if (!admin && req.userId !== req.params.voteId){
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

