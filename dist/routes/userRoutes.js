"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Apply auth middleware to all routes below this line
router.use(auth_1.auth);
// Protected routes
router.get('/', userController_1.getUsers);
router.post('/', userController_1.createUser);
router.get('/:id', userController_1.getUser);
router.put('/:id', userController_1.updateUser);
router.delete('/:id', userController_1.deleteUser);
exports.default = router;
