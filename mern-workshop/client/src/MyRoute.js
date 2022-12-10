import {BrowserRouter, Switch, Route} from "react-router-dom"
import App from "./App"
import FormComponent from "./components/FormComponent";
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent";

const MyRoute =()=> {
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={App} />
                <Route path="/create" exact component={FormComponent} />
                <Route path="/blog/:slug" exact component={SingleComponent}/>
                <Route path="/blog/edit/:slug" exact component={EditComponent} /> 
                {/* Route path="/blog/edit/:slug" เป็นการลิงค์ไป EditComponent เพื่อแก้ไขข้อมูลของ slug นั้นๆ เฉพาะส่วนหน้าบ้านแสดงผล */}

            </Switch>
        </BrowserRouter>
    )

};

export default MyRoute;