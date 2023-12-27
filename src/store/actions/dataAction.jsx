import {axiosInstance} from '../../network/axiosinstance';

export const getData = () => (dispatch) => {
    axiosInstance.post('/interactivebook/get_jsondata/', {})
        .then((resolved) =>
        dispatch({
            type: "GET_DATA",
            payload: resolved.data.data
        }))
        .catch((err) => console.log("Error while fetching Data :", err))

}




