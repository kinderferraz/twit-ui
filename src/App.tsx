import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Feed from './components/Feeds/MainFeed/Feed';
import { Sidebar } from './components/Sidebar/Sidebar';

const AppStyled = styled.div`
  display: flex;
  justify-content: space-around;
  height:100%
`

const Home = () => {
  return (
    <AppStyled>
      <Sidebar />
      <Feed />
    </AppStyled>
  );
}

const UserFeed = () => {
  const { userId } = useParams()
  return (
    <AppStyled>
      <Sidebar />
      User {userId}
    </AppStyled>
  )
}

const Mentions = () => {
  return (
    <h1>
      Mentions
    </h1>
  )
}

const FullTweet = () => {
  const { id } = useParams()
  return (
    <h1>
      Tweet {id}
    </h1>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/user/:usr_id' element={
        <UserFeed />
      } />
      <Route path='/tweet/:id' element={
        <FullTweet />
      } />
      <Route path='/mentions' element={
        <Mentions />
      } />
      <Route path='/' element={
        <Home />
      } />
    </Routes>
  )

}

export default App;
