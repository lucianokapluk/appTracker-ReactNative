const states = {};

const Reducers = (state = states, action) => {
  switch (action.type) {
    case 'LOADING': {
      return {...state, loading: true};
    }
    case 'ERROR': {
      return {...state, error: action.payload, loading: false};
    }
    case 'LOGEARSE': {
      return {...state, ...action.payload};
    }

    default:
      return {state};
  }
};

export default Reducers;
