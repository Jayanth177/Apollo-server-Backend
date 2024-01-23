import { AuthenticationError } from "apollo-server-errors";

import  Jwt  from "jsonwebtoken";

module.exports=(context)=>{

    const authHeader = context.req.headers.authorization;
    if (authHeader){
        //Bearer

        const token= authHeader.split('Bearer')
        if(token){
            try{
                const user = Jwt.verify(token,"UNSAFE_STRING");
                return user;
            }catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error("Authentication token must be'Bearer[token] ");

    }
    throw new Error('Authentication header must be provided');
};