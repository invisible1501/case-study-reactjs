import './App.css';
import { Route, Routes,  } from "react-router-dom";
/* import Post from './component/api/create-mockapi/component/Post';
import Users from './component/mockapi-axios/user';
import UserDetails from './component/mockapi-axios/userDetail'; */
import Login from './component/case-study/views/Login';
import SignUp from './component/case-study/views/SignUp';
import HomePage from './component/case-study/views/HomePage';
import './component/case-study/views/HomePage.css';
import DetailUser from './component/case-study/views/DetailUser';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/detail" element={<DetailUser />} />
        </Routes>
    )
}

export default App;
