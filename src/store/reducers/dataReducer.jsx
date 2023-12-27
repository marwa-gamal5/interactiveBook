const INITIAL_VALUE = {
    data:[],
    circle: {},
    PageNum:{},
    Line:{},
    addText:{},
    rec:{},
    undo:{},
    redo:{},
    draw:{},
    changecolor:{},
    stopdraw: {},
    removeone: false

}
export default function dataReducer (state = INITIAL_VALUE, action) {

    switch (action.type) {
        case "GET_DATA":
            return {
                ...state,
                data : action.payload
            }
            case "TEST":
            return {
                ...state,
                circle : action.payload

            }
            case "PAGE_NUM":
            return {
                ...state,
                PageNum : action.payload
            }
        case "SET_LINE":
            return {
                ...state,
                Line : action.payload
            }
        case "SET_TEXT":
            return {
                ...state,
                addText : action.payload
            }
        case "SET_REC":
            return {
                ...state,
                rec : action.payload
            }

        case "SET_UNDO":
            return {
                ...state,
                undo : action.payload
            }
            case "SET_REDO":
            return {
                ...state,
                redo : action.payload
            }
            case "SET_DRAW":
            return {
                ...state,
                draw : action.payload
            }
            case "SET_CLEARALL":
            return {
                ...state,
                ClearAll : action.payload
            }
            case "SET_CLEAR_OBJECT":
            return {
                ...state,
                ClearObject : action.payload
            }
        case "SET_DRAW2":
            return {
                ...state,
                draw2 : action.payload
            }

        case "SET_STOP_DRAW":
            return {
                ...state,
                stopdraw : action.payload
            }
        case "SET_REMOVE_ONE":
            return {
                ...state,
                removeone : action.payload
            }

        case "CHANGECOLOR":
            return {
                ...state,
                changecolor : action.payload
            }
        default :
            return state;
    }

}