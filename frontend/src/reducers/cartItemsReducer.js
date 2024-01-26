
export const cartItemsReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            return [
                ...state,
                {...action.payload}
            ];
        case 'INCREASE_IN_CART':
            const cartWithIncreasedItem= state.map(item => {
                if(item.id === action.payload.id) {
                    return {...item, count: item.count++}
                } else {
                    return item;
                }
            });
            return cartWithIncreasedItem;
        case 'DECREASE_IN_CART':
            const cartWithDecreasedItem = state.map(item => {
                if(item.id === action.payload.id && item.count >1) {
                    return {...item, count: item.count--}
                } else {
                    return item;
                }
            });
            return cartWithDecreasedItem;

        case 'REMOVE_FROM_CART':
            const filteredProducts = state.filter(item => item.id !== action.payload.id);
            return filteredProducts;
        default: 
            return state;
    }
}

