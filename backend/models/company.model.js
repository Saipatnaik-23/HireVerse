import monogoose from 'mongoose'
const companySchema = new monogoose.Schema({
    name:{
        type:'String',
        required:true,
        unique:true
    },
    description:{
        type:'String'
    },
    website:{
        type:'String'
    },
    location:{
        type:'String'
    },
    logo:{
        type:'String' // url for company logo
    },
    userId:{
        type:monogoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

export const Company = monogoose.model('Company', companySchema)