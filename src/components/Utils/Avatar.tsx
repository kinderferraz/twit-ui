import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import profilePicture from '../../static/profile.jpeg'

interface Props {
    gridarea?: string | null,
    imgSrc?: string,
    profileUrl?: string,
    className?: string
}

export const AvatarStyled = styled.div<Props>`
    overflow: hidden;
    grid-area: ${props => props?.gridarea};
`

const PictureStyled = styled.img`
    place-self: center;
    object-fit: cover;
    display: inline;
    height: 100%;
    width:  100%;
    
    border-radius: 50%;
`

const Avatar: React.FC<Props> = (props) => {
    return (
        <AvatarStyled className={props.className || ''} as={Link} to={props.profileUrl || '/'}
            gridarea={props.gridarea}>
            <PictureStyled src={props.imgSrc ?? profilePicture}
                alt="minha imagem de perfil"
                /* as="a" href="/" */ />
        </AvatarStyled>
    )
}

export default Avatar