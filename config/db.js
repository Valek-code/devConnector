import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('MongoDB connected.')
    } catch (err) {
        console.log(err.message)

        // exit process with failure
        process.exit(1)
    }
}

export default connectToDB