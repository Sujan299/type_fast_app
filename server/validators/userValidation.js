const {z} = require("zod");

// add all field that I want in next function maybe it's controller. even by making it optional()
// all field is needed here.
const loginSchema_traditional = z.object({
    email: z.
    string({required_error: "Email is required !"})
    .trim().email({message: "Email is not valid !"}),
    password: z.
    string({required_error: "Password is required !"})
    .min(6, {message: "At least 6 character is needed !"})
    .max(255, {message: "Maximum 255 characters is required !"})
    .regex(/[0-9]/, {messgae : "Password must contain at least one digit !"})
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {message: "Password must contain at least on special character !"})
});
const loginSchema_google = z.object({
    email: z.
    string({required_error: "Email is required !"})
    .trim().email({message: "Email is not valid !"}),
    password: z.string().optional(), 
});

const signupSchema_traditional = z.object({
    username: z.string()
    .min(4, {message: "Need minimum 4 characters"})
    .regex(/[^a-z]/ , {message: "Username must start with character !"}),
    image: z
    .string().url({message: "Invalid image url !"}),
    email: z.
    string({required_error: "Email is required !"})
    .trim().email({message: "Email is not valid !"}),
    password: z.
    string({required_error: "Password is required !"})
    .min(6, {message: "At least 6 character is needed !"})
    .max(255, {message: "Maximum 255 characters is required !"})
    .regex(/[0-9]/, {messgae : "Password must contain at least one digit !"})
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {message: "Password must contain at least on special character !"}),
    provider: z.
    string().optional()
});
const signupSchema_google = z.object({
    image: z
    .string(),
    email: z.
    string({required_error: "Email is required !"})
    .trim().email({message: "Email is not valid !"}),
    googleId: z.
    string().optional(),
    provider: z.
    string().optional()
});

const signupSchema = z.union([signupSchema_traditional,signupSchema_google]);
const loginSchema = z.union([loginSchema_traditional,loginSchema_google]);

module.exports = {loginSchema, signupSchema};

