"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// @desc    Get all users
// @route   GET /api/users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.getUsers = getUsers;
// @desc    Get single user
// @route   GET /api/users/:id
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id).select('-password');
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.getUser = getUser;
// @desc    Create user
// @route   POST /api/users
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, age } = req.body;
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }
        const user = yield User_1.default.create({ name, email, password, age });
        res.status(201).json({
            success: true,
            data: { id: user._id, name: user.name, email: user.email, age: user.age }
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.createUser = createUser;
// @desc    Update user
// @route   PUT /api/users/:id
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age } = req.body;
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.updateUser = updateUser;
// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.deleteUser = deleteUser;
