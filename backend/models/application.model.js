import monogoose from 'mongoose' 
const applicationSchema = new monogoose.Schema({
    job:{
        type:monogoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:monogoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true})

export const Application = monogoose.model('Application',applicationSchema)