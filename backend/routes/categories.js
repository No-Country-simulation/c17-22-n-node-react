const express = require('express');
const router = express.Router();
const controller = require("../controllers/categories");
const authentication = require("../helpers/tokenValidators");

router.get("/", controller.getAllCategories);
router.get("/:categoryId", controller.getCategory)
router.post("/",authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, controller.addCategory);
router.put("/:categoryId", authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, controller.updateCategory);
router.delete("/:categoryId",authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, controller.deleteCategory);

module.exports = router