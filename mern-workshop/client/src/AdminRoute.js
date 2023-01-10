import { getUser } from "./services/authorize"; // ถ้ามีค่าใน getUser จะให้มันตรวจสอบว่าเป็น Admin ไหมในหน้านี้
import { Route, Redirect } from "react-router-dom"; // Routerเอามาเพื่อตรวจสอบpathที่จะเข้า ถ้ายังไม่ login -> redirect path

const AdminRoute = ({component:Component,...rest}) => ( // props = component ที่เราจเรียกใช้งาน ...rest คือ props ที่ทำงานในแต่ละ component
    <Route
        {...rest}
        render={props =>  // check ว่า login แล้วยัง ถ้าlogin แล้วจะให้ใช้ Component ต่างๆ ได้
            getUser() ? 
            (<Component {...props}/>) : 
            (// if not login redirect to login and set state
                <Redirect to={ {pathname:"/login", state:{from:props.location}} } /> ) } 

    />
)

export default AdminRoute