const{z}=require("zod");

//creating an object schema
const loginSchema=z.object({
    
    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"invalid email"})
    .min(3,{message:"email must be atleast of 3 characters"})
    .max(45,{message:"email must be atmost of 45 characters"}),

    password:z
    .string({required_error:"password is required"})
    .trim()
    .min(7,{message:"password must be atleast of 7 characters"})
    .max(100,{message:"password must be atmost of 100 characters"}),
})
const signupSchema = loginSchema.extend({
    username:z
    .string({required_error:"name is required"})
    .trim()
    .min(3,{message:"name must be atleast of 3 characters"})
    .max(25,{message:"name must be atmost of 25 characters"}),


    phone:z
    .string({required_error:"phone is required"})
    .trim()
    .min(3,{message:"phone must be atleast of 3 characters"})
    .max(10,{message:"phone must be atmost of 10 characters"}),

   
});

module.exports={signupSchema,loginSchema};