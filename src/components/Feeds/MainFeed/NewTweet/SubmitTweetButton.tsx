import React from 'react'
import styled from 'styled-components'

interface Props {
    gridarea?: string
}

const SubmitTweetButtonStyled = styled.button<Props>`
    grid-area: ${props => props.gridarea || ''};
    color: inherit;
    background-color: var(--blue);
    text-alignment:center;
    text-decoration:none;
    font-weight: bold;
    font-size: 90%;
    border: 0px;
    border-radius: 20%/50%;

    display:flex;
    align-items:center;
    justify-content:center;
`

const SubmitTweetButton: React.FC<Props> = (props) => {
    return (
        <SubmitTweetButtonStyled gridarea={props.gridarea} >
            Tweet
        </SubmitTweetButtonStyled >
    )
}

export default SubmitTweetButton