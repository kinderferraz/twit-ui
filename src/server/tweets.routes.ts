import express from 'express';
import { Params } from 'twit';
import twitter from './service/twitter.js';

export interface ApiResponse {
    data: { data: Array<any> },
    r: object
}

type MaybeString = string | undefined
type Request = express.Request
type Response = express.Response
const router = express.Router()

router.get('/home', (req: Request, res: Response) => {
    const type = req.query.type
    const sinceId = req.query.sinceId as MaybeString
    console.log('retrieving', type)
    twitter.get(`statuses/${type}_timeline`, { since_id: sinceId }, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data })
        console.log('retrieved')
    })
})

router.get('/tweet', (req: Request, res: Response) => {
    console.log("showing")
    const id = req.body as Params
    twitter.get('statuses/show', id, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.post('/tweet', (req: Request, res: Response) => {
    console.log('tweeting')
    const status = req.body as Params
    console.log(status)
    twitter.post('statuses/update', status, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.delete('/tweet', (req: Request, res: Response) => {
    console.log('deleting')
    const params = req.body as Params
    twitter.post('statuses/destroy', params, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.get('/retweets', (req: Request, res: Response) => {
    console.log('geting retweets')
    const id = req.body as Params
    twitter.post('statuses/retweets', id, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})


router.post('/retweet', (req: Request, res: Response) => {
    console.log('retweeting')
    const id = req.body as Params
    twitter.post('statuses/retweet', id, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.delete('/retweet', (req: Request, res: Response) => {
    console.log('unretweeting')
    const id = req.body as Params
    twitter.post('statuses/unretweet', id, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.get('/like', (req: Request, res: Response) => {
    console.log('listing likes of user')
    const userId = req.body as Params
    twitter.post('favorites/list', userId, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.post('/like', (req: Request, res: Response) => {
    console.log('liking tweet')
    const id = req.body as Params
    twitter.post('favorites/create', id, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.delete('/like', (req: Request, res: Response) => {
    console.log('unliking tweet')
    const id = req.body as Params
    twitter.post('favorites/destroy', id, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

export default router