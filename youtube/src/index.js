import connectDB from './db/index.js';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config({
    path: "./env"
})
connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch(error => console.log("DB ERROR", error));

















// const app = express()
//     (async () => {
//         try {
//             await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//             app.on("error", (error) => {
//                 console.log("Error in connecting to DB");
//                 throw error;
//             })
//             app.listen(process.env.PORT, () => {
//                 console.log("Server is running on port " + process.env.PORT);
//             })
//         } catch (error) {
//             console.log("DB not connected");
//             throw error;
//         }
//     })()