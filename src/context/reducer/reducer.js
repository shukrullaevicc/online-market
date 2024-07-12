export const initialState = {
   user: null,
   loading: false,
   product: [],
   favourites: [],
   cart: [],
}

const reducer = (state, action) => {
   console.log(action)
   switch(action.type){

      case "REGISTER__USER":
         return {
            user: action.user,
         }

      case "LOGIN__USER":
         localStorage.setItem("token", action.tokens.access_token)
         return state

      case "LOADING":
         return {
            ...state,
            loading: action.loading
         }
      case 'ADD_TO_THE_FAVOURITE_LIST':
         return {
            ...state,
            favourites: [...state.favourites, ...action.favourites]
         };

      case 'ADD_TO_THE_CART_LIST':
         return {
            ...state,
            cart: [...state.cart, ...action.cart]
         };

      case 'ADD_TO_THE_CART_LIST':
            return {
               ...state,
               favourites: [...state.cart, ...action.cart]
            };

      case 'REMOVE_FROM_THE_FAVOURITE_LIST':
         return {
            ...state,
            favourites: state.favourites.filter(product => product.id !== action.id)
         };  
      default:
         return state
   }
}

export default reducer