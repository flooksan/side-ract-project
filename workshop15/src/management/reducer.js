// กำหนด action ใน app
const reducer= (state,action) => { 
    /* ตัวอย่างการลบข้อมูล จะพบว่า มีการเรียกdispathจาก context.js ส่งค่า id มาเพื่อลบของที่ id ตรงกันใน state
       แต่เราพบว่ามันส่ง action type มาเป็น 'REMOVE_ITEM' ซึ่งยังไม่มี action เราจึงจำเป็นต้องสร้าง */
    console.log('ค่าใน state', state)

    // check action remove item
    if (action.type === 'REMOVE_ITEM') {
        
        return {
            ...state, // หมายความว่าเราจะเอาค่าใน state  = initState ไปใช้ดังเดิมทุกตัวยกเว้นตัวข้างล่าง array cart ของ object item แต่ละตัว
            cart:state.cart.filter((item)=> item.id !== action.payload) /*เรียก object state.cart เพื่อเข้าถึง itemต่างๆ ในตะกร้าที่เราเอาโชว์หน้าเว๊ป 
        จากนั้นจะทำการ filter ว่า item.idในcart !== action.payload **ที่ใช่ไม่เท่ากับเพราะ filter จะส่งคืน array เดิมแต่ตัดตัวที่ id = id จาก payload แล้วเก็บใส่ใน cart อีกทีนึง */
            
        }//อยากดูว่าหลังจากลบค่าเป็นยังไงไป log ดูตอนเอาค่าไป map ใน Cart.js 

    }
    
    // chec action TOGGLE_QUANTITY
    if (action.type === 'TOGGLE_QUANTITY') {
        //  console.log('Toggle')
        // เข้าถึง state cart เพื่อเอาทุกตัวมา map แล้วเช็คว่า id ตัวไหนเท่ากับ id ที่pay load ส่งมา
        let newCart = state.cart.map((item)=>{
            if(item.id === action.payload.id) {
                if(action.payload.type === 'increment') {
                    console.log('Increment item +1')
                    return {
                        ...item, // return item ที่ id = id payload เพื่อเพิ่มค่า 
                        // โดยเอาค่าใน item มาเรียงกันทุกตัว ที่เรา return เหมือนกับ return object แบบด้านล่างแต่แค่ว่าค่า quantityให้ +1 ก่อนส่งกลับไป
                        /* {
                                id:1,
                                name : "INNO3D GEFORCE RTX 4080 16GB ICHILL X3",
                                image_url:"https://www.jib.co.th/img_master/product/original/2022111513520756267_1.jpg",
                                price:58800,
                                quantity:1
                            } */
                        quantity: item.quantity < 5 ?  item.quantity+1 : item.quantity //ให้เพิ่มค่าได้ไม่เกิน 5
                    }
                } else { 
                    return {
                        ...item,
                        quantity: item.quantity >0 ? item.quantity-1 : item.quantity
                    }
                }
            }return item
        }).filter((item) => item.quantity !== 0) //ใช้ filter เช็คว่า itemไหนที่มีค่า quantity !=0 จะถูกส่งไปใช้ ส่วนอันไหนที่มีค่าเป็น 0 จะถูกเอาออกจาก state และหน้า Cart.js
        // console.log(newCart)
        return {
            ...state,cart:newCart
           
        }
    }
    

    // check action CALCULATE_TOTAL
    if(action.type === 'CALCULATE_TOTAL') {
        // ต้องสร้าง newTotal ,amount มาเก็บค่าก่อนที่จะ state ก่อนจะไป update state ที่return **ทำแล้ว error ตั้งชื่อเดิมให้เหมือนกับ initState
        const {total ,amount} = state.cart.reduce((cartTotal,item) => { // ค่า item = {object gpuแต่ละตัว ที่มี id,name,image_url,price,quantity} cartTotal มีค่าเท่ากับ initialValue = { total:0, amount:0, } ด้านล่าง
            // เรา object destructure เพื่อไม่ต้องมาพิมพ์ item.price item.quantity
            const { price, quantity, id, } = item
            const itemTotal = price*quantity //คำนวณผลรวมของสินค้าแต่ละตัว
            cartTotal.total += itemTotal 
            /* cartTotal.total = itemTotal หมายความว่าเอาค่ามาของ 
            ยอดรวมราคาสินค้า id นั้นๆไปเก็บใน cartTotal แต่เราต้องการผลรวมทุกสินค้าทุกตัวทุก id ทำโดยเอาไปเก็บ cartTotal.total += itemTotal 
            จะเขียน cartTotal.total + itemTotal แบบที่ทำไม่ได้เพราะมันบังคับให้ สร้างตัวแปรมาเก็บ หรือ เรียกเป็น function */
            cartTotal.amount += quantity  
            return cartTotal // return object ที่มีการเปลี่ยนแปลงค่า total กับ amount ใหม่ออกไปเก็บใน newTotal , newAmount
        } , {
            total:0,
            amount:0
        } )
        console.log(total,amount)
        return {
            ...state,total,amount
        }
    }

}

export default reducer;


