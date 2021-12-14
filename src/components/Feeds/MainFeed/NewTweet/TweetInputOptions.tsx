import React from 'react'
import styled from 'styled-components'

import {
    GrImage, AiOutlineGif, ImParagraphLeft,
    BsEmojiSmile, FaRegCalendarPlus
} from 'react-icons/all';
import Icon from '../../../Utils/Icon';

interface Props {
    gridarea?: string
}

const TweetInputOptionsStyled = styled.div<Props>` 
    grid-area: ${props => props.gridarea || ''};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap:3%;
    &>a>svg>path{
        stroke: var(--blue);
    }

    &>a{
        display: flex;
        align-items: center;
        justify-content:center;
        padding:0;
        height: 35px;
        width: 35px;
    }

`
const icons = [GrImage, AiOutlineGif, ImParagraphLeft, BsEmojiSmile, FaRegCalendarPlus]
    .map(icon => React.createElement(icon))

const TweetInputOptions: React.FC<Props> = (props) => {
    return (
        <TweetInputOptionsStyled gridarea={props.gridarea}>
            {icons.map((icon, idx) =>
                <Icon key={idx}>
                    {icon}
                </Icon>
            )}
        </TweetInputOptionsStyled>
    )
}

export default TweetInputOptions