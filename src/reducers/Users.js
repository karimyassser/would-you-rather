import { RECIEVE_USERS } from "../actions/Users";
import { MODIFY_USERS_STATE } from "../actions/Users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECIEVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case MODIFY_USERS_STATE:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: [action.answer]
                    }
                }
            }
        default:
            return state
    }
}
