import { Request, Response, Router } from 'express'
import { body, Result, ValidationError, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { validateToken } from './middleware/validateToken'


const router:Router = Router()

interface IUser {
    email: string;
    password: string;
}

const users: IUser[] = [];


router.post("/api/user/register",
    body("email").isEmail().escape(),
    body("password"),
    async (req: Request, res: Response):Promise<any> => {
        const errors: Result<ValidationError> = validationResult(req)
        if(!errors.isEmpty()) {
            //console.log(errors);
            return res.status(400).json({errors: errors.array()})
            
        }
    try{
        const existingUser: IUser | undefined = users.find(user => user.email === req.body.email)
        //console.log(existingUser)
        if (existingUser) {
            return res.status(403).json({email: "Email already in use"})
        }

        const salt: string = bcrypt.genSaltSync(10)
        const hash: string = bcrypt.hashSync(req.body.password, salt)

        const newUser: IUser = {
            email: req.body.email,
            password: hash
        }

        users.push(newUser)
        return res.status(200).json(newUser)    
    } catch (error: any) {
        console.error(`Error during registration: ${error}`)
        return res.status(500).json({error: "Internal Server Error"})
    } 

})

router.get("/api/user/list", async (req: Request, res: Response):Promise<any> => {
    return res.status(200).json(users);
});


router.post("/api/user/login", 
body("email").escape(),
body("password"),
async (req: Request, res: Response):Promise<any> =>{
    try {
        const user: IUser | undefined = users.find(user => user.email === req.body.email)
        console.log(user)
        if (!user){
            return res.status(401).json({message: "Login failed"})
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            const JwtPayload: JwtPayload ={
                email: user.email
            }
            const token: string = jwt.sign(JwtPayload, process.env.SECRET as string, { expiresIn: "2m"})

            return res.status(200).json({success: true, token})
        }
        return res.status(401).json({message: "Login failed"})

    } catch(error: any){
        console.error(`Error during user login: ${error}`)
        return res.status(500).json({ error: "Internal server error" })
    }

    

})
export default router