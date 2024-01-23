import{ gql } from 'apollo-server';


module.exports = gql`
type Message {
    text: String
    createdAt: String
    createdBy: String
}

type User{
    username: string
    email: string
    password: string
    token: string 
}

input MessageInput {
    text: String
    username: String
}

input RegisterInput{
    username: string
    email: string
    password: string

}

input LoginUser{
    email: string
    password: string
}

type Query {
    message(id: ID!): Message
    user(id: ID!):User 
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput):User ok
    
};
`