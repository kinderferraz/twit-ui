import axios from "axios"

const Relay = axios.create({
    baseURL: 'http://localhost:3004',
})

Relay.defaults.headers.common['Content-Type'] = 'application/application-json'

const deleteLike = async (id: string) => {
    const res = await Relay.delete('/like', {
        data: {
            id
        }
    }).catch(err => console.log(err))
    return res
}

const like = async (id: string) => {
    const res = await Relay.post('/like', {
        data: { id }
    }).catch(err => console.log(err))
    return res
}

const retweet = async (id: string) => {
    const res = await Relay.post('/retweet', {
        data: { id }
    }).catch(err => console.log(err))
    return res
}

const deleteRetweet = async (id: string) => {
    const res = await Relay.delete('/retweet', {
        data: {
            id
        }
    }).catch(err => console.log(err))
    return res
}

export const Actions = {
    like: like,
    deleteLike: deleteLike,
    retweet: retweet,
    deleteRetweet: deleteRetweet
}

export const getTimeline = async (type: string, sinceId?: string) => {
    const res = await Relay.get('/home', {
        params: { type: type, sinceId: sinceId }
    }).catch(err => console.log(err))
    return res
}

export default Relay