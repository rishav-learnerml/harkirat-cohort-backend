"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserSchema = void 0;
const zod_1 = require("zod");
exports.insertUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(8),
    password: zod_1.z.string().min(8),
    email: zod_1.z.string().email()
});
