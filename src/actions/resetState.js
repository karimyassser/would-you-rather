export const RESET = 'RESET'
function reset() {
    return {
        type: RESET
    }
}
export function resetState(){
    return(dispatch) =>{
        dispatch(reset())
    }
}