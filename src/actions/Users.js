import { _saveQuestionAnswer } from "../_DATA"
export  const RECIEVE_USERS = 'RECIEVE_USERS'
export const MODIFY_USERS_STATE = 'MODIFY_USERS_STATE'

export function recieveUsers (users){
    return {
        type: RECIEVE_USERS,
        users
    }
}
function modifyUserState (authedUser , qid , answer){
    return{
        type : MODIFY_USERS_STATE,
        authedUser,
        qid,
        answer,
    }
}
export function handleModidyUser(qid , answer){
    return(dispatch , getState)=>{
        const {authedUser} = getState()
        return _saveQuestionAnswer({
            authedUser ,
            qid,
            answer
        }).then(()=>dispatch(modifyUserState(authedUser, qid , answer )))
        .catch((e)=>{
            console.warn( "User",e)
        })

    }
}