"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAdressesSchema = exports.insertUserSchema = void 0;
const zod_1 = require("zod");
exports.insertUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(8),
    password: zod_1.z.string().min(8),
    email: zod_1.z.string().email(),
});
exports.insertAdressesSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    state: zod_1.z.string().min(3),
    city: zod_1.z.string().min(3),
    pincode: zod_1.z.number().min(6),
});
