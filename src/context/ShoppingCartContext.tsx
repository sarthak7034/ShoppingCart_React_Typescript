import { createContext,ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem= {
    id: number
    quantity : number
}

type ShoppingCartContext = {
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => number
    decreaseCartQuantity: (id:number) => number
    removeFromCart: (id:number) => number

}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children} : ShoppingCartProviderProps){

    const [cartItems,setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id:number){
        return cartItems.find(item=>item.id == id)?.quantity || 0
    }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

    function decreaseCartQuantity(id:number){
        setCartItems(currItem =>{
            if(currItem.find(item =>item.id ==id)?.quantity == 1){
                return currItem.filter(item => item.id!=id)
            }else{
                return currItem.map(item =>{
                    if(item.id == id){
                        return {...item,quantity:item.quantity-1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id:number){
        setCartItems(currItem =>{
            return currItem.filter(item => item.id!=id)
        })
    }

    return(
        <ShoppingCartContext.Provider value={{getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}