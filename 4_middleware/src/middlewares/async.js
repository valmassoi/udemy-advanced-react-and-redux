export default function({ dispatch }) {
  return next => action => {
    console.log(action)
    if(!action.payload || !action.payload.then) {
      return next(action)//go to next middleware, then reducer
    }
    action.payload
      .then(response => {
          const newAction = { ...action, payload: response }
          dispatch(newAction)//goes thru all middlewares again
        }
      )//promise resolves
  }
}
