import { Request, Response, Router } from 'express'
import { body, Result, ValidationError, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

const router:Router = Router()

interface IUser {
    email: string;
    password: string;
}

const users: IUser[] = [];


router.post("/api/user/register",
    body("email").isEmail(),
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
        return res.status(200).json({message: "User registered successfully"})    
    } catch (error: any) {
        console.error(`Error during registration: ${error}`)
        return res.status(500).json({error: "Internal Server Error"})
    } 

})

router.get('/api/user/list', async (req: Request, res: Response):Promise<any> => {
    return res.status(200).json(users);
});
export default router