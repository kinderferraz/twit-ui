import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { InteractionClickHandler } from '../Feeds/Tweet/Tweet';
import { Interactions } from '../Feeds/Tweet/TweetInteractionBar';

interface IconProps {
    scale?: boolean,
    size?: string,
    action?: Interactions,
    href?: string,
    active?: string,
    handler?: InteractionClickHandler
}

const HiddenTextStyled = styled.div`
    visibility:hidden;
`

export const IconStyled = styled(Link)`
    display: flex;
    align-items: center;
    
    color: var(ligh-gray);
    border-radius: 60%; 

    &:visited{
        color: inherit;
    }

`

const Icon: React.FC<IconProps> = (props) => {
    let children = React.Children.toArray(props.children)
    const Icon = children[0]
    const label = children[1]
    const handler = props.handler ? props.handler : undefined

    return (
        <>
            <IconStyled className={props.active} onClick={(e) => {
                handler && handler(e, props.action, props.active === 'active')
            }}
                to={props.href || ''} >
                {Icon}
                <HiddenTextStyled aria-valuetext='{props.label}'>
                </HiddenTextStyled>
            </IconStyled>
            {label}
        </>
    )
}

export default Icon