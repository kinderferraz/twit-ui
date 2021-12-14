/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import styled from "styled-components"
import { AiOutlineRetweet } from "react-icons/all"
import { Twitter } from "twit"
import Avatar, { AvatarStyled } from "../../Utils/Avatar"
import ImageComposer from "../../Utils/ImageComposer"
import TweetInteractionBar, { Interactions } from "./TweetInteractionBar"
import UserName, { UserNameStyled } from "./UserName"
import Moment from 'moment'
import { Actions } from '../../../services/relay'
import { InteractionHandler } from "../MainFeed/Timeline"

type Status = Twitter.Status
type User = Twitter.User
type MaybeString = string | undefined

interface Props {
    tweet: Status,
    handler: InteractionHandler
}

interface ActualData {
    tweet: Status,
    user: User,
    entities: Twitter.Entities,
    retweetedBy: User
}

export type InteractionClickHandler = (e: React.MouseEvent<HTMLAnchorElement>,
    label: Interactions | undefined, active: boolean) => void

export const TweetStyled = styled.div`
    padding: 0.5em;
    padding-bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: start;

    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--border-color);
    
    &>.tweet-avatar{
        padding: 0.2em 0.5em;
        width: 4em;
    }
`

const TweetTextStyled = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: stretch;
`

const RetweetTopbarStyled = styled.div`
    display:flex;

    &>svg {
        color:var(--green);
        margin-right: 0.5em;
    }
`

const QuotedTweetStyled = styled(TweetStyled)`
    min-height: 2em;
    max-height: auto;
    margin: 0.5em 0 0.2em 0;
    padding-bottom: 0.5em;
    border-color: var(--border-color);
    border-style: solid;
    border-width: 2px;
    border-radius: 15px;

    color: inherit;
    text-decoration: none;

    & ${UserNameStyled}{
        margin-top: -0.5em;
    }

    & ${AvatarStyled}{
        margin-right: 0.5em;
    }

`

const getActualData = (status: Status) => {
    return {
        tweet: status.retweeted_status || status,
        user: status.retweeted_status?.user || status.user,
        entities: status.retweeted_status?.entities || status.entities,
        retweetedBy: status.retweeted ? status.user : undefined
    } as ActualData
}

const getImgage = (status: Status): Twitter.MediaEntity[] | undefined => {
    return status.extended_entities?.media
}

const removeLinkAtEnd = (text: MaybeString): MaybeString => {
    if (!text) return
    return text.replace(/https:\/\/.*$/, '')
}

const removeScreenNamesAtBegining = (text: MaybeString) => {
    if (!text) return
    while (text.startsWith('@')) {
        text = text.replace(/@\w*\s/, '')
    }
    return text
}

const generateQuoteComponent = (status: Status) => {
    if (!status.quoted_status) return
    const subTweet = status.quoted_status as Status
    const user = subTweet.user

    let text = removeLinkAtEnd(subTweet.text)
    text = removeScreenNamesAtBegining(text)

    const imageAlone = (!text) && subTweet.extended_entities
    const images = subTweet.extended_entities && subTweet?.extended_entities.media
        .map(entity => entity.media_url)
    const displayComponent = imageAlone ? (
        <ImageComposer src={images as string[]} alt={[]} />
    ) : text

    const quoteComponent =
        <QuotedTweetStyled>
            <Avatar imgSrc={user.profile_image_url} profileUrl={`/user/${user.id_str}`} />
            <TweetTextStyled>
                <UserName name={user.name} screenName={user.screen_name} createdAt={""} />
                {displayComponent}
            </TweetTextStyled>
        </QuotedTweetStyled >
    return quoteComponent
}

const generateTopbarElement = (status: Status, retweeter: User) => {
    if (!status.retweeted_status) return
    return (
        <RetweetTopbarStyled>
            <AiOutlineRetweet />
            <h4>{retweeter.name} retweetou isso</h4>
        </RetweetTopbarStyled>
    )
}

const getTimeLabel = (status: Status) => {
    const createdAt = Moment(status.created_at)
    const diff = Moment.duration(createdAt.diff(Moment.now()))
    const diffDays = Math.floor(Math.abs(diff.asDays()))
    const diffHours = Math.floor(Math.abs(diff.asHours()))
    const diffMins = Math.floor(Math.abs(diff.asMinutes()))

    return ((diffDays > 3) && createdAt.format('DD MM YY'))
        || (((diffDays) > 0) && `${diffDays}d`)
        || ((diffHours > 0) && `${diffHours}h`)
        || (`${diffMins}m`)

}

const getApiCall = (action: string) => {
    switch (action) {
        case 'like':
            return Actions.like
        case 'deleteLike':
            return Actions.deleteLike
        case 'retweet':
            return Actions.deleteRetweet
        case 'deleteRetweet':
            return Actions.deleteRetweet
    }
}

class Tweet extends React.Component<Props, Props> {
    constructor(props: Props) {
        super(props)
        this.state = {
            tweet: props.tweet,
            handler: props.handler
        }
    }

    handleInteraction: InteractionClickHandler = (e, label, active) => {
        e.preventDefault()
        if (!label) return

        const thisId = this.state.tweet.id_str
        const action = active
            ? "delete" + (label.charAt(0).toUpperCase() + label.slice(1))
            : label

        console.log(action, thisId);
        const apiCall = getApiCall(action)
        const res = (apiCall && apiCall(thisId))

        if (typeof res == typeof Error) return

        this.state.handler(this.state.tweet, action)

    }

    render() {
        const actual = getActualData(this.state.tweet)
        const images = getImgage(this.state.tweet)
        const tweet = actual.tweet
        const user = actual.user || {}
        const retweetedBy = actual.retweetedBy
        const RetweetTopbarElement = generateTopbarElement(
            this.state.tweet, this.state.tweet.user)
        const QuotedElement = generateQuoteComponent(this.state.tweet)
        const retweeted = this.state.tweet.retweeted
        const liked = this.state.tweet.favorited

        let text = images ? removeLinkAtEnd(tweet.text) : tweet.text
        text = QuotedElement ? removeLinkAtEnd(text) : text

        const MediaComposerIfPresent = images && <ImageComposer
            src={images.map(img => img.media_url)} alt={[]} />

        return (
            <TweetStyled >
                <Avatar className='tweet-avatar' imgSrc={user?.profile_image_url}
                    profileUrl={`/user/${user.id_str}`} />
                <TweetTextStyled>
                    {RetweetTopbarElement}
                    <UserName name={user.name}
                        screenName={user.screen_name}
                        createdAt={getTimeLabel(tweet)} />
                    <p>{text}</p>
                    {MediaComposerIfPresent}
                    {QuotedElement}
                    <TweetInteractionBar liked={liked || false}
                        retweeted={retweeted}
                        handler={this.handleInteraction} labels={[
                            0,
                            tweet.retweet_count,
                            tweet.favorite_count,
                        ]} />
                </TweetTextStyled>
            </TweetStyled >
        )
    }
}

export default Tweet