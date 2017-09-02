import actions from './action-types'

export const setIsMobile = payload => dispatch => dispatch({ type: actions.SET_IS_MOBILE, payload })

export const authUser = payload => dispatch => dispatch({ type: actions.AUTH_USER, payload })
export const logInUser = () => dispatch => dispatch({ type: actions.LOG_IN })
export const logOutUser = () => dispatch => dispatch({ type: actions.LOG_OUT })
