import { createStore } from "redux";

const initialState = {
    open: false
};

const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'setOpen':
            return { ...state, open: action.payload };
        default:
            return state; 
    }
};

const store = createStore(taskReducer);

export default store;
