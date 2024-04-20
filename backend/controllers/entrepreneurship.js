const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


const prisma = new PrismaClient();

exports.getAll = [];


