import { _getUsers } from "../_DATA";
import { recieveUsers } from "./Users";
import { _getQuestions } from "../_DATA";
import { recieveQuestions } from "./Questions";



export default function handleRecieveData() {
    return  (dispatch) => {
        _getUsers()
       .then((user)=>{
           dispatch(recieveUsers(user))
       })
       _getQuestions()
       .then((question)=>{
        dispatch(recieveQuestions(question))
       })
    }
}
