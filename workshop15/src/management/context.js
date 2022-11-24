// Create context api for provider variable to component
import { createContext, useContext, useReducer, useEffect } from "react";
import CartData from "../assets/ShoppingCart/data/CartData";
import reducer from './reducer'


const initState = { //เก็บข้อมูลทั้งหมดที่ถูกเก็บไว้ใน web มี สินค้าในตะกร้า ยอดรวม ปริมาณสินค้าในตะกร้าที่โชว์ต้อง navbar
    cart:CartData, // สินค้าในตะกร้า
    total:0, // ยอดรวมที่ต้องชำระเงิน
    amount:0, // จำนวนสินค้าในตะกร้า
} //การจะเปลี่ยนแปลงข้อมูลใน initState เราทำได้โดยไปใช้ reducer ใน reducer.js จัดการ


// จุดให้บริการข้อมูล
const CartContext = createContext() //สร้างมาแต่ยังไม่ set value เป็นตัวส่ง value ไปใช้แต่ละ component

// สร้างฟังก์ชันแล้ว exportไปให้เวลาเอาไปใช้ที่อื่นจะได้ง่ายไม่ต้องมา import CartContext แล้วก็ useContext
export const MyCartContext = () => {
    return useContext(CartContext)
}
    /* สาธิตคือถ้าเราไปใช้งาน App.js แล้วจะใช้ตัว CartContextเราต้อง
        import { CartContext } , import { useContext } 
        useContext(CartContext)   
        
        วิธีด้านบนจะง่ายแค่ import { MyCartContext } 
        แล้วเรียก MyCartContext() เลยจะได้ก้อนข้อมูลเหมือนกัน
    */


const CartProvider = ({children}) => {
    // CartProvider เป็นตัวให้บริการข้อมูล โดยส่ง CartContext ไปใช้งาน ใน component ลูก {children}
    // โดยมันจะนำ initState data ไปใช้ร่วมกับ  reducer
    const [state,dispatch] = useReducer(reducer,initState) //ส่งค่า reducer มาทำงานในนี้ เพื่อเอา initState ส่งไปเปลี่ยนแปลงข้อมูลที่มัน
        // เอาข้อมูลเก็บใน array state ส่วน dispatch คือรูปแบบ action ที่เกิดขึ้นภายในแอปส่งผลอะไรให้ข้อมูลมีการเปลี่ยนแปลงก็จะสั่ง dispatch
    
    //---- useEffect ----// เอามาดักจับค่าภายใน state.cart ว่ามีค่าใดเปลี่ยนแปลงไหมถ้ามีให้ทำการเรียกใช้ fuction บางอย่าง
    useEffect (()=> {
        // ถ้ามีค่าเปลี่ยนแปลงให้เรียก dispatch action = CALCULATE_TOTAL ที่ reducer
        dispatch({type:'CALCULATE_TOTAL'})
    },[state.cart])
    
    // ---- function ---- //
    const removeItem = (id) => {
        // สร้าง Remove Item เพื่อส่งไปใน CartContext.Provider ด้วย
        console.log('id select',id) //หลังจากไปกดลบ item ใน CartItem มันจะส่ง id มาให้เราเอาไปเปรียบเทียบกับ state in reducer
        
        // เราต้องการ remove item ต้องเรียกใช้ dispatch แล้วกำหนด type ไป แล้วส่งค่าไปทำงานคือ payload ส่ง id ไปทำงานใน reducer เพื่อเอาไปลบ
        dispatch({type:'REMOVE_ITEM',payload:id}) // เมื่อปุ่มกดกากบาทเกิด action removeIitem แล้วสั่งให้ dispatch ส่ง type action :REMOVE_ITEM กับค่า payload: id ที่จะนำไปลบใน state
    
    }

    const toggleQuantity = (id,type) => { // ถูกเรียกใช้เมื่อกดปุ่ม + , - ใน CartItem
       dispatch({type:'TOGGLE_QUANTITY',payload:{id,type}}) //สั่ง dispatch ว่าาตอนนี้จะเข้าไปทำงานกับ state ที่อยู่ในแอปเราแล้วโดยส่ง type ไปพร้อมส่งค่า 2 ค่าผ่าน payload
    }

    // function format number by add comma(,) 1,000 , 10,000
    const formatNumber =(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
    return (
        // เรียกใช้งานตัว CartContext ที่เป็นก้อนข้อมูล โดนกำหนดข้อมูล value โดยเอามาจาก state ด้านบนที่เรากำหนดซึ่งเป็น object
        // ซึ่ง object state ด้านบนมีการเรียกใช้ useReducer ของ reducer.js โดยจะไปบอก reducer ว่าตอนนี้เรามีก้อนข้อมูลถูกใช้งานใน CartContext.Provider
        // ถ้ามีการกระทำใดๆ ที่ทำการเปลี่ยนแปลงข้อมูล เพิ่ม ลบ แก้ไข ต่างๆ ให้ตัว reducer จัดการนะ
        <CartContext.Provider value={{ ...state, removeItem, toggleQuantity, formatNumber, }}>
            {children}   {/* component ลูกที่จะถูกส่งข้อมูลไปทำงาน */}
        </CartContext.Provider>
    )

}

export { CartContext, CartProvider } // CartProvider กระจาย และแชร์ข้อมูลไปที่คอมโพแนนท์อื่นๆ app โดยเราเอาไปครอบไว้


// component อื่นนอกจากตัว app ที่เราเอา CartProvider ไปครอบถ้าอยากจะใช้ข้อมูลต้อง import CartContext โดยใช้คำสั่ง useContext