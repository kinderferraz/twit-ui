import React from "react"
import styled from "styled-components";
import TopBar from "./TopBar";
import NewTweet from "./NewTweet/NewTweet";
import Timeline from "./Timeline";

const FeedStyled = styled.div`
    overflow:auto;
    margin-right: min(40%, 10em);
    flex-grow: 3; 
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: var(--border-color);   
`

const Feed = () => {
    return (
        <FeedStyled>
            <TopBar feedType="latests" />
            <NewTweet></NewTweet>
            <Timeline/>
        </FeedStyled>

    )
}
export default Feed