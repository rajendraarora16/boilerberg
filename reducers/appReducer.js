import { FAILURE, INCREMENT, LOAD_DATA_SUCCESS, TICK_CLOCK } from '../constants/appConstant';
import { globalState } from './rootState'

const increment = (count) => count + 1;

function appReducer(state = globalState, action) {

  switch(action.type) {
    
    case FAILURE:
      return state.set('error', action.error);

    case INCREMENT:
      return state.update('count', increment);

    case LOAD_DATA_SUCCESS:
      return state.merge({placeholderData: action.data});

    case TICK_CLOCK:
      return state.set('lastUpdate', action.ts).set('light', !!action.light);

    default:
      return state;
  }
}

export default appReducer;
