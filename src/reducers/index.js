import { combineReducers } from 'redux'
import users from './Users'
import questions from './Questions'
import authedUser from './Autheduser'
const appReducer = combineReducers({
    users,
    questions,
    authedUser
})
const rootReducer =(state , action) =>{
    if(action.type ==='RESET')
    {
        return appReducer(undefined , action)
    }
    return  appReducer(state , action)
}
export default rootReducer