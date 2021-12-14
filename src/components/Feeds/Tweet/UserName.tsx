import React from 'react'
import styled from "styled-components";
import { BsDot, HiDotsHorizontal } from 'react-icons/all';
import Icon, { IconStyled } from '../../Utils/Icon';

interface Props {
    name: string,
    screenName: string,
    createdAt: string
}

export const UserNameStyled = styled.div`
    padding: 0.1em 0;
    color: var(--light-gray);

    display: flex;
    flex-direction: row;
    align-items: baseline;

    &>${IconStyled}{
        padding: 0.2em
    }

    &>${IconStyled}:hover{
        background-color: var(--hard-blue);
    }

`

const ScreenName = styled.span`
    color: var(--xx-light-gray);
    padding-right: 0.3em;
`
const MutedInfoStyled = styled.span`
`

const BsDotStyled = styled(BsDot)`
    margin: 0 0.2em;
`

const SpacerStyled = styled.span`
    flex-grow: 99;
`


const UserName: React.FC<Props> = (props) => {
    return (
        <UserNameStyled>
            <ScreenName>{props.name}</ScreenName>
            <MutedInfoStyled>
                @{props.screenName}
                <BsDotStyled ></BsDotStyled>
                {props.createdAt}
            </MutedInfoStyled>
            <SpacerStyled />
            <Icon>
                <HiDotsHorizontal size='0.5em' />
            </Icon>
        </UserNameStyled>

    )
}

export default UserName