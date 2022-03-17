
const initialState = {
    userAthantication: false,
};

const userData = {
    data: {
        email: "jayesh.chouhan@cubexo.com",
        id: 3,
        mobile_number: 9826684906,
        name: "jay",
        profile_image: null
    },
    
}


export function Reducer1(state = initialState, action){
    switch(action.type){
        case "ATHANTICATION": 
            return {...state, userAthantication: action.payload.no};
        default:
            return state;
    }
}

export function Reducer2(state = userData, action){
    switch(action.type){
        case "LOGINUSERDATA": 
            return {...state, data: action.payload.data};
        default:
            return state;
    }
}
export default Reducer1;