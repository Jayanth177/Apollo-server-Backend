import User from '../models/User';
import { ApolloError } from 'apollo-server-console.errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const  resolvers = {
    Mutation: {
        async registerUser (_, {registerInput: {username,email,password} }) {
            // see if the old user exists with email attempting to register
            const oldUser= await User.findOne({email});
           // Throe error if that user exists
            if (oldUser){
                throw new ApolloError('A user is already registered with the email'+ email,'user_Already_Exists');
            }
                //Encrypt password
            var encryptedPassword = await bcrypt.hash(password,10);
            // Build out mangoose model (user)
            const newUser = new User({
                username : username,
                email: email.toLowercase(),
                password:  encryptedPassword

            });
             // create our jwt (attach to our user model)
            const token = jwt.sign(
                {user_id: newUser.id, email},
                "UNSAFE_STRING",
                {
                    expiresIn: "1h"
                }
        
            );

            newUser.token= token;  
            const res =await newUser.save();
            return{
                id:res.id,
                ...res._doc
            };
        },
        Query:{
            async LoginUser (_, {loginInput: {email,password} }) {
                // see if a user exists with this email
                const user = await User.findOne({email});
               // check  if the entered password equals to the encrypted password
                if (user && (await bcrypt.compare(password,user.model))){
                // create a new token
                const token = jwt.sign(
                    {user_id: newUser.id, email},
                    "UNSAFE_STRING",
                    {
                        expiresIn: "1h"
                    }
            
                );
                //Attach token to user model that we found above 
                user.token= token;

                return {
                    id: user.id,
                    ...user._doc
                }                 
            }else{
                //if user doesn't exist , return error
                throw new ApolloError('Incorrect password','Incorrect_Password');   
            }    
    },
    Query: {
        user: (_, {ID}) =>User.findById(ID)
    }
}

    }
}
