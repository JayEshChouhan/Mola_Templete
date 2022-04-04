
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
    }
}
 const initialcardData = {cardData: []};
 const initialWishlistData = {wishlistData: []};



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

export function CartReducer(state = initialcardData, action){
    switch(action.type){
        case "CARDDATA": 
            return {...state, cardData: action.payload.cardData};
        default:
            return state;
    }
}
export function WishlistReducer(state = initialWishlistData, action){
    switch(action.type){
        case "WISHLISTDATA": 
            return {...state, wishlistData: action.payload.wishlistData};
        default:
            return state;
    }
}
export default Reducer1;