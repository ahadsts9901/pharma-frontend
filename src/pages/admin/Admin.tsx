import "./Admin.css"
import MiniDrawerMUI from "../../components/mui/DrawerMui"
import Child from "./components/Child"

const Admin = () => {
    return (
        <>
            <MiniDrawerMUI>
                <Child />
            </MiniDrawerMUI>
        </>
    )
}

export default Admin