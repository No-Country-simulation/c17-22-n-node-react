const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

exports.getSubcategory = asyncHandler( async (req,res,next) => {
  const subcategory = await prisma.subcategory.findFirst({
    where:{id:parseInt(req.params.subcategoryId)}
  })
  if(subcategory){
    return res.status(200).json({subcategory})
  }
  return res.status(404).json({msg:`The Subcategory ${req.params.subcategoryId} dosen't exists`})
});

exports.getAllSubcategories = asyncHandler(async (req,res,next) => {
  const subcategories = await prisma.subcategory.findMany({})
  return res.status(200).json(subcategories)
})

exports.addSubcategory = [
  body("subcategory")
  .trim()
  .isLength({min:1, max:56})
  .withMessage("The subcategory name should not be empty"),
  body("categoryID")
  .trim()
  .isLength({min:1})
  .withMessage("Category Id Should't be empty")
  .toInt()
  .isInt({
    min:1
  })
  .withMessage("Invalid Category Id")
  ,
  asyncHandler( async (req,res,next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0]});
    }

    const category = await prisma.category.findFirst({
      where:{
        id:parseInt(req.body.categoryId)
      }
    })

    if(!category){
      return res.status(400).json({msg:`The category ${req.body.categoryId} dosen't extists`});
    }

    const newsubcategory = await prisma.category.create({
      data:{
        name:req.body.category,
        categoryId: category.id,
      }
    })

    return res.status(200).json({subcategoryId:newsubcategory.id})
  })
];

exports.updateSubcategory = [
  body("subcategory")
  .optional()
  .trim()
  .isLength({min:1, max:56})
  .withMessage("The subcategory name should not be empty"),
  body("categoryID")
  .optional()
  .trim()
  .isLength({min:1})
  .withMessage("Category Id Should't be empty")
  .toInt()
  .isInt({
    min:1
  })
  .withMessage("Invalid Category Id"),
  asyncHandler( async (req,res,next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0]});
    }

    const subcategory = await prisma.subcategory.findFirst({
      where:{
        id:parseInt(req.params.subcategoryId)
      }
    })

    if(!subcategory){
      return res.status(400).json({msg:`The subcategory ${req.params.subcategoryId} dosen't extists`});
    }

    const newData = {}


    if(req.body.categoryId){
      const category = await prisma.category.findFirst({
        where:{
          id:parseInt(req.body.categoryId)
        }
      })
  
      if(!category){
        return res.status(400).json({msg:`The category ${req.body.categoryId} dosen't extists`});
      }
      newData.categoryId = category.id
    }

    newData.name = req.body.name ?? subcategory.name

    await prisma.subcategory.update({
      where:{
        id:subcategory.id
      },
      data:newData
    })

    return res.status(200).json({msg:`the subcategory ${subcategory.id} was updated correctly`})
  })

];

exports.deleteSubcategory = asyncHandler(async (req,res,next) => {
  const deletetSubcategory = await prisma.subcategory.delete({
    where:{
      id:parseInt(req.params.subcategoryId)
    }
  })

  if(!deletetSubcategory){
    return res.status(404).json({msg:`The subcategory ${req.params.subcategoryId} dosen't exists`});
  }

  return res.status(200).json({msg:`The category ${req.params.subcategoryId} was deletect correctly`});
});

