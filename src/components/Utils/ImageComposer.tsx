import React from 'react'
import styled from 'styled-components'

interface Props {
    src: string[],
    alt: string[],
}

interface StyleProps {
    gridarea: string
}

const BaseImageContainer = styled.div`
    padding-right: 0.5em;
    width: auto !important;
    height: 20em !important;
    display: grid;

`
const TwoImageContainer = styled(BaseImageContainer)`
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1px;
    overflow: hidden;
`

const ThreeImageContainer = styled(BaseImageContainer)`
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: "first second" "first third";
    column-gap: 1px;
    row-gap: 1px;
`

const ImageStyled = styled.img<StyleProps>`
    display: inline-block;
    width: 100%;
    height: 100%;
    place-self: center;
    object-fit: cover;
    grid-area: ${props => props.gridarea};
    border-radius: 15px;
    border-color: var(--border-color);
    border-style: solid;
    border-width: 2px;

`

const getContainerSize = (len: 1 | 2 | 3) => {
    switch (len) {
        case 2:
            return TwoImageContainer
        case 3:
            return ThreeImageContainer
        default:
            return BaseImageContainer
    }
}

const ImageComposer: React.FC<Props> = (props) => {
    const Container = getContainerSize(props.src.length as 1 | 2 | 3)
    const areas = ['first', 'second', 'third']
    return (
        <Container>
            {props.src.map((img, idx) =>
                <ImageStyled src={img} gridarea={areas[idx]}
                    key={idx} alt={props.alt[idx] || ''} />
            )}
        </Container>
    )
}

export default ImageComposer