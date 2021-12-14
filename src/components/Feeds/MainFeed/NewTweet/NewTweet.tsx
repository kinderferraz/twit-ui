import React from "react"
import styled from "styled-components"
import Avatar from "../../../Utils/Avatar"
import SubmitTweetButton from "./SubmitTweetButton"
import TweetInput from "./TweetInput"
import TweetInputOptions from "./TweetInputOptions"

export type ChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => void
export type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void

interface Props { }
interface State {
    tweetText?: string,
}

const NewTweetStyled = styled.form`
    font-size:1em;
    padding: 0.5em 1.5em 0.5em 1em;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--border-color);

    display: grid;
    grid-template-columns: 3.5em [main-text] auto [submit-button] 5em;
    grid-template-rows: 3.5em [options-line] 2em;
    gap: 0.3em 0.75em;

    grid-template-areas:
        "avatar   main-text main-text"
        ".        options   submit";
`

class NewTweet extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            tweetText: undefined
        }
        this.handleChange.bind(this)
        this.handleSubmit.bind(this)
    }

    handleChange: ChangeHandler = (e) => {
        e.preventDefault()
        let tweetText = e.currentTarget.value
        tweetText = tweetText.length > 244 ? tweetText.slice(0, 244) : tweetText
        e.currentTarget.value = tweetText
        this.setState({ tweetText: tweetText })
    }

    handleSubmit: SubmitHandler = (e) => {
        e.preventDefault()
        console.log('onsubmit', this.state.tweetText)
    }

    render() {
        return (
            <NewTweetStyled onSubmit={e => this.handleSubmit(e)}>
                <Avatar gridarea='avatar' />
                <TweetInput gridarea='main-text' handler={this.handleChange} />
                <TweetInputOptions gridarea='options' />
                <SubmitTweetButton gridarea='submit' />
            </NewTweetStyled>
        )
    }
}


export default NewTweet