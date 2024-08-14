export const AUTHED_USER = 'AUTHED_USER'

export function recieveAuthedusers(id) {
    return {
        type: AUTHED_USER,
        id,
    }
}