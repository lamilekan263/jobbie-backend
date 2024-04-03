import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import { errorMiddleware } from './middleware';
import { AuthRouter, jobRouter } from './routes';


export const app = express();


app.use(express.json({ limit: '5mb' }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('jobs-api');
});

app.use('/api/v1', AuthRouter)
app.use('/api/v1', jobRouter)


app.use('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('testing')
})

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`route ${req.originalUrl} does not exist`) as any;
    err.statusCode = 404;
    next(err)
})



app.use(errorMiddleware)

