
const express = require('express');
const router = express.Router();
const controller = require("../controllers/subcategories");
const authentication = require("../helpers/tokenValidators");

router.get("/", controller.getAllSubcategories);
router.get("/:subcategoryId", controller.getSubcategory)
router.post("/",authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, controller.addSubcategory);
router.put("/:subcategoryId", authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, controller.updateSubcategory);
router.delete("/:subcategoryId",authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, controller.deleteSubcategory);

module.exports = router