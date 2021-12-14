import React from 'react'
import styled from 'styled-components'
import {
    FaTwitter, FaCircle, RiHome7Line,
    BsSearch, BsBookmark, BsCardText,
    VscBell, IoMailOutline, IoPersonOutline,
    HiOutlineDotsCircleHorizontal, GiFeather
} from 'react-icons/all'
import Icon, { IconStyled } from '../Utils/Icon';


const IconStack = styled.span`
    display: grid;
    svg{
        grid-area: 1 / 1;
    }
    svg:last-child{
        padding: 0.1em 0.5em;
    }
`

const SidebarStyled = styled.div`
    padding: 1em 1em 0 2em;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: var(--border-color);

    &>${IconStyled}{
        font-size: 1.4em;
        padding: 0.4em;
    }

    &>${IconStyled}:hover{
        color:var(--blue);
        background-color:var(--soft-blue);
    }
`
const iconElements = [FaTwitter, RiHome7Line,
    BsSearch, BsBookmark, BsCardText,
    VscBell, IoMailOutline, IoPersonOutline,
    HiOutlineDotsCircleHorizontal].map(icon => React.createElement(icon))

const routes = [
    undefined, undefined, undefined, undefined, undefined,
    '/mentions', undefined, undefined, undefined
]

export function Sidebar() {
    return (
        <SidebarStyled>
            {iconElements.map((icon, idx) => {
                return (
                    <Icon href={routes[idx]} key={idx}>
                        {icon}
                    </Icon>
                )
            })}
            <Icon href='/'>
                <IconStack>
                    <FaCircle color='var(--blue)' size='2em' />
                    <GiFeather color='var(--black)' size='2em'></GiFeather>
                </IconStack>
            </Icon>

        </SidebarStyled>
    )
}
