import { model, Schema }  from 'mongoose' ;

const messageSchema = new Schema({
    username:{type: string, default: null},
    email:{type: string, unique: true},
    password: {type: string},
    token: { type: string}
});

module.exports = model('Message', messageSchema);