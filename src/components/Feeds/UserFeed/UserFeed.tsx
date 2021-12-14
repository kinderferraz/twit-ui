import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Twitter } from "twit";
import Relay from "../../../services/relay";

type MaybeUser = Twitter.User | undefined
type TweetArray = Twitter.Status[]

interface Props { }
interface State {
    tweets: TweetArray,
    user: MaybeUser
}

export const UserFeedStyled = styled.div``

const UserFeed = (props: Props) => {
    const { userId } = useParams()
    const [tweets, setTweets] = useState([] as TweetArray)
    const [user, setUser] = useState(undefined as MaybeUser)
    return (
        <UserFeedStyled />
    )
}

export default UserFeed