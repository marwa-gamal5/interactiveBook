const INITIAL_VALUE = {
    data:[],
}
export default function dataReducer (state = INITIAL_VALUE, action) {

    switch (action.type) {
        case "GET_DATA":
            return {
                ...state,
                data : action.payload
            }
        default :
            return state;
    }

}