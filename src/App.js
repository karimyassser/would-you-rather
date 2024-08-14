import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import handleRecieveData from './actions/Shared'
import Dashboard from './components/dashboard';
import Login from './components/login';
import NewQuestion from './components/NewQuestion';
import LeaderBoard from './components/LeaderBoard';
import QuestionDetails from './components/questionDetails';
import ProtectedRoutes from './components/ProtectedRoutes';
import NavBar from './components/nav-bar';
import { Navigate, useParams, useLocation } from 'react-router-dom';
function App({ dispatch, authedUser }) {
  const param = useParams()
  const location = useLocation()
  let { id } = param
  let { state } = location
  console.log("state", state?.id, "id", id)
  useEffect(() => {
    dispatch(handleRecieveData())
  })
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='*' element={<div align="center" style={{ paddingTop: "auto" }}><h1> 404 Page Not Found</h1></div>} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>} />
        <Route path='/add' element={<ProtectedRoutes>
          <NewQuestion />
        </ProtectedRoutes>} />
        <Route path='/leaderBoard' element={<ProtectedRoutes>
          <LeaderBoard />
        </ProtectedRoutes>} />
        <Route path={`/questions/:id`} element={<ProtectedRoutes>
          {state?.id ? <QuestionDetails /> : <Navigate to="/404"  />}
        </ProtectedRoutes>} />
        <Route path='/404' element={<div align="center" style={{ paddingTop: "auto" }}><h1> 404 Page Not Found</h1></div>} />
      </Routes>
    </div>

  )
}

function mapStateToProps({ authedUser }) {

  return ({
    authedUser
  })
}
export default connect(mapStateToProps)(App);
