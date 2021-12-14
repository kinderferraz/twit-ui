import React from "react"
import styled from "styled-components"
import { HiOutlineSparkles } from 'react-icons/hi'

interface Props {
    feedType: string
}

const TopbarStyled = styled.div`
    padding: 0.75em 1em;
    font-size: 1.3em;
    font-weight:bold;
    display: flex;
    justify-content: space-between;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--border-color);
`

const TopBar = (props: Props) => {
    return (
        <TopbarStyled>
            <p>Latest Tweets</p>
            <HiOutlineSparkles></HiOutlineSparkles>
        </TopbarStyled>
    )
}

export default TopBar