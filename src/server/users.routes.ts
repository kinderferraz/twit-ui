import express from "express"
import twitter from "./service/twitter.js"

type Request = express.Request
type Response = express.Response
const router = express.Router()

router.get('/me', (req: Request, res: Response) => {
    twitter.get('account/verify_credentials', (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.get('/users', (req: Request, res: Response) => {
    const ids = req.query.id as string
    console.log('user', ids)
    twitter.get(`users/lookup`, { user_id: ids }, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
        console.log('retrieved')
    })
})

router.get('/followers/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const cursor = req.query.cursor as string
    console.log('followers of', id)
    twitter.get('followers/list', {
        user_id: id,
        cursor: cursor ? cursor : -1
    }, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.get('/following:id', (req: Request, res: Response) => {
    const id = req.params.id
    const cursor = req.query.cursor as string
    twitter.get('friends/list', {
        user_id: id,
        cursor: cursor ? cursor : -1
    }, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.post('/follow:id', (req: Request, res: Response) => {
    const id = req.params.id
    twitter.post('friendships/create', { user_id: id }, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

router.delete('/follow:id', (req: Request, res: Response) => {
    const id = req.params.id
    twitter.post('friendships/destroy', { user_id: id }, (err, data, r) => {
        err ? res.sendStatus(500) : res.send({ data, r })
    })
})

export default router
