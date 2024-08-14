import { RECIEVE_QUESTIONS } from "../actions/Questions"
import { ADD_QUESTIONS } from "../actions/Questions"
import { SAVE_ANSWER } from "../actions/Questions"


export default function questions(state = {}, action) {
    switch (action.type) {
        case RECIEVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTIONS:
            return {
                ...state,
                [action.Question.id]: action.Question,
            }
        case SAVE_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        default:
            return state
    }
}
