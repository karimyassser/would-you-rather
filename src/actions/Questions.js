import { _saveQuestion } from "../_DATA"
import { _saveQuestionAnswer } from "../_DATA"
export const RECIEVE_QUESTIONS = 'RECIEVE_QUESTIONS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function recieveQuestions(questions) {
    return {
        type: RECIEVE_QUESTIONS,
        questions
    }
}
function AddQuestion(Question) {
    return {
        type: ADD_QUESTIONS,
        Question
    }
}
function SaveAnswer(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
    }
}
export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then((Question) => dispatch(AddQuestion(Question)))

    }

}
export function handleSaveAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => dispatch(SaveAnswer(authedUser, qid, answer)))
            .catch((e) => {
                console.warn("Question", e)
            })

    }
}