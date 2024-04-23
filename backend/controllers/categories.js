const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

exports.getCategory = asyncHandler( async (req,res,next) => {
  const category = await prisma.category.findFirst({
    where:{id:parseInt(req.params.categoryId)}
  })
  if(category){
    return res.status(200).json({category})
  }
  return res.status(404).json({msg:`The Category ${req.params.categoryId} dosen't exists`})
});

exports.getAllCategories = asyncHandler(async (req,res,next) => {
  const categories = await prisma.category.findMany({})
  return res.status(200).json(categories)
})

exports.addCategory = [
  body("category")
  .trim()
  .isLength({min:1, max:56})
  .withMessage("The category name should not be empty"),
  asyncHandler( async (req,res,next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0]});
    }

    const newCategory = await prisma.category.create({
      data:{
        name:req.body.category
      }
    })

    return res.status(200).json({categoryId:newCategory.id})
  })
];

exports.updateCategory = [
  body("category")
  .optional()
  .trim()
  .isLength({min:1, max:56})
  .withMessage("The category name should not be empty"),
  asyncHandler( async (req,res,next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid data' + result.array()[0]});
    }

    const updatedCategory = await prisma.category.update({
      where:{
        id:parseInt(req.params.categoryId)
      },
      data:{
        name:req.body.category
      }
    })

    if(!updatedCategory){
      return res.status(404).json({msg:`The Category ${req.params.categoryId} dosen't exists`})
    }

    return res.status(200).json({msg:`the category ${newCategory.id} was updated correctly`})
  })

];

exports.deleteCategory = asyncHandler(async (req,res,next) => {
  const deletetCategory = await prisma.category.delete({
    where:{
      id:parseInt(req.params.categoryId)
    }
  })

  if(!deletetCategory){
    return res.status(404).json({msg:`The Category ${req.params.categoryId} dosen't exists`});
  }

  return res.status(200).json({msg:`The category ${req.params.categoryId} was deletect correctly`});
});

