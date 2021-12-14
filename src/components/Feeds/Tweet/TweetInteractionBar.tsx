import React from 'react'
import styled from 'styled-components'
import Icon, { IconStyled } from '../../Utils/Icon'
import { InteractionClickHandler } from './Tweet'
import {
    FaRegComment, AiOutlineRetweet, BsHeart, FiShare, BsHeartFill
} from 'react-icons/all'

export type Interactions = 'reply' | 'retweet' | 'like' | 'share'

interface Props {
    labels: (number | undefined)[],
    liked: boolean,
    retweeted: boolean,
    handler: InteractionClickHandler,
}

const actions: Interactions[] = ['reply', 'retweet', 'like', 'share']
const fgColors = ['var(--light-gray)', 'var(--green)', 'var(--red)', 'var(--light-gray)']
const bgColors = ['var(--soft-blue)', 'var(--bg-green)', 'var(--bg-red)', 'var(--soft-blue)']

const TweetInteractionBarStyled = styled.div`
    height: 100%;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: baseline;

    & ${IconStyled}{
        padding: 0.4em;
        margin: 0.1em;
    }

    & ${IconStyled}:first-child:hover{
        color: ${fgColors[0]};
        background-color: ${bgColors[0]};
    }

    & ${IconStyled}:nth-child(3):hover,
    & ${IconStyled}:nth-child(3).active{
        color: ${fgColors[1]};
    }

    & ${IconStyled}:nth-child(3):hover,
    & ${IconStyled}:nth-child(3).active{
        color: ${fgColors[1]};
        background-color: ${bgColors[1]};
    }


    & ${IconStyled}:nth-child(5):hover,
    & ${IconStyled}:nth-child(5).active{
        color: ${fgColors[2]};
        background-color: ${bgColors[2]};
    }

    & ${IconStyled}:nth-child(5):hover,
    & ${IconStyled}:nth-child(5).active{
        color: ${fgColors[2]};
    }

    & ${IconStyled}:nth-child(7):hover {
        color: ${fgColors[3]};
        background-color: ${bgColors[3]};
    }

`
const TweetStats = styled.span`
    color: var(--light-gray);
    padding: 0 5em 0 0;
`

const shrinkLabels = (label: string | undefined) => {
    if (!label) return
    if (label.length >= 6) return label.charAt(0).concat('M')
    if (label.length >= 3) return label.charAt(0).concat('K')
    return label
}

const TweetInteractionBar: React.FC<Props> = (props) => {
    const labels = props.labels.map(label => label?.toString())
    const likeIcon = props.liked ? BsHeartFill : BsHeart
    const icons = [FaRegComment, AiOutlineRetweet, likeIcon, FiShare]
        .map(icon => { return React.createElement(icon) })
    const actives = [false, props.retweeted, props.liked, false]
    return (
        <TweetInteractionBarStyled>
            {icons.map((icon, idx) => {
                const active = actives[idx] ? 'active' : ''
                return (
                    <Icon active={active} handler={props.handler} key={idx}
                        action={actions[idx]}>
                        {icon}
                        <TweetStats>
                            {shrinkLabels(labels[idx])}
                        </TweetStats>
                    </Icon>
                )
            }
            )}
        </TweetInteractionBarStyled>
    )
}

export default TweetInteractionBar