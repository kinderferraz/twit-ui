import twit from 'twit';
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.REACT_APP_CONSUMER_KEY);

const twitter = new twit({
    consumer_key: process.env.REACT_APP_CONSUMER_KEY || "",
    consumer_secret: process.env.REACT_APP_CONSUMER_SECRET || "",
    access_token: process.env.REACT_APP_ACCESS_TOKEN || "",
    access_token_secret: process.env.REACT_APP_ACCESS_TOKEN_SECRET || "",
    timeout_ms: 60 * 1000,
    strictSSL: true
})


export default twitter 