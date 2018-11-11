import axios from 'axios'

//ACTION TYPE
const SUBMIT_DATA = 'SUBMIT_DATA';

//ACTION CREATORS
const submit = (data) => ({type: SUBMIT_DATA, data})

//THUNK CREATORS
export const submitData = input => async dispatch => {
  try{
    console.log("thunk", typeof input)
    const {data} = (await axios.post('/api/thomsonreuters', input))
    console.log("back in the thunk", data)
    dispatch(submit(data))
  }catch(err) {
    console.log(err)
  }
}

//REDUCER
export default function(state = {}, action) {
  switch(action.type){

    case SUBMIT_DATA:
      return action.data

      default:
      return state
  }
}
