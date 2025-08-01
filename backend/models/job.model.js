import monogoose from 'mongoose'

const jobSchema = new monogoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String
    }],
    salary:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:monogoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:monogoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:monogoose.Schema.Types.ObjectId,
        ref:'Application'
    }]
},{timestamps:true})

export const Job = monogoose.model('Job',jobSchema)