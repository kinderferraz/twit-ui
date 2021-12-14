import React from 'react'
import { Twitter } from 'twit'

type Status = Twitter.Status
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type User = Twitter.User
type TweetArray = Status[]

interface Props { }

interface State {
    tweets: TweetArray
}

export default class MentionsFeed extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            tweets: []
        }
    }

    render() {
        return (
            <>
            </>

        )
    }
} 