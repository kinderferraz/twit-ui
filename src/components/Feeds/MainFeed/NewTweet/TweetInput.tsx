import React from 'react'
import styled from 'styled-components'
import { ChangeHandler } from './NewTweet'

interface Props {
    gridarea?: string | null,
}

interface Handlers{
    handler: ChangeHandler
}

const TweetInputStyled = styled.textarea<Props>`
    grid-area: ${props => props?.gridarea};
    color: var(--x-light-gray)

    width: auto;
    height: auto;
    resize: none;
    background-color: inherit;
    border: none;

    font: inherit;
    font-size: 1.3em;


    &:focus{
        outline:none;
    }
    &::placeholder{
        font-size: 1.2rem;
    }
`

const TweetInput: React.FC<Props & Handlers> = (props) => {
    return (
        <TweetInputStyled onChange={e=>props.handler(e)} placeholder="What's happening?"
            id='mainFeedTweetInput'>
        </TweetInputStyled>
    )
}

export default TweetInput

