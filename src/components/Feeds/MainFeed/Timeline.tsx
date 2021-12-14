/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Twitter } from 'twit'
import { data } from '../../../server/data/home'
import { getTimeline } from '../../../services/relay'
import Tweet from '../Tweet/Tweet'

type Status = Twitter.Status
export type TweetArray = Status[]
export type InteractionHandler = { (tweet: Status, action: string): void }
type SetStateFunction = {
    (value: React.SetStateAction<TweetArray>):
        void; (arg0: any[]): void
}


const TimelineStyled = styled.div`
    height: auto;
`

const getTimelineAndUpdate = (tweets: TweetArray, setTweets: SetStateFunction) => {
    getTimeline('home', tweets[0]?.id_str).then(res => {
        const newTweets = res as unknown as TweetArray
        if (newTweets.length === 0)
            return

        let updatedTweets = [newTweets, ...tweets]
        updatedTweets = updatedTweets.length > 150
            ? updatedTweets.slice(0, 150)
            : updatedTweets
        setTweets(updatedTweets)
    }).catch(err => console.log(err))
}

const Timeline = () => {
    const twoMinutes = 2 * 60 * 1000
    //const [tweets, setTweets] = useState([] as TweetArray)
    const [tweets, setTweets] = useState(data as unknown as TweetArray)

    const handleTweetInteraction: InteractionHandler = (tweet: Status, action: string) => {
        const idx = tweets.findIndex((t) => t.id_str === tweet.id_str)
        console.log('found at', idx)
        action === 'like' && (tweet.favorited = true)
        action === 'deleteLike' && (tweet.favorited = false)
        action === 'retweet' && (tweet.retweeted = true)
        action === 'deleteRetweet' && (tweet.retweeted = false)

        tweets[idx] = tweet
        setTweets(tweets)

    }

    /*     useEffect(() => {
            const update = () => {
                getTimelineAndUpdate(tweets, setTweets)
            }
            const id = setInterval(update, twoMinutes)
            update()
            return () => clearInterval(id)
        }, [tweets, twoMinutes]) */

    const TweetElements = tweets.map(tweet => <Tweet handler={handleTweetInteraction}
        tweet={tweet} key={tweet.id_str} />)

    return (
        <TimelineStyled>
            {TweetElements}
        </TimelineStyled>
    )
}

export default Timeline
