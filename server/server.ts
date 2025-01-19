import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import  authRouter  from './routes/auth';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import  { config } from 'dotenv'
import { authenticateToken } from './middleware/auth';
import AWS from 'aws-sdk';
import artworksRouter from './routes/artworks';

config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin:['http://localhost:3000','http://localhost:3000/']
}))


AWS.config.update({
    region: process.env.AWS_REGION, 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

app.use('/api/auth', authRouter)
app.use('/api/artworks',authenticateToken, artworksRouter)


// app.get('/protected', authenticateToken, (req: Request, res: Response) =>{

//     if(req.user && req.user.userEmail){
//         console.log(`user connected is: ${req.user.userEmail}`)
//         res.status(200).end('protected route manged to be accessed')    
//     }
// })

app.get('/',(req: Request, res: Response) =>{
    res.status(200).end('Welcome to our server');
})

const port = process.env.PORT;


app.listen(port, ()=>{
    console.log(`Started listening on port ${port}`);
})