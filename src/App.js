import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './Home';
import UserRegistration from './UserRegistration';
import Login from './Login';
import ViewFiles from './ViewFiles';
import FileUpload from './FileUpload';
import UserDashBoard from './UserDashBoard';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Home/>}></Route>
      <Route path="/register" element={<UserRegistration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path ="/viewFiles" element={<ViewFiles/>}/>
      <Route path="/fileupload" element={<FileUpload/>}/>
      <Route path ="/dashboard" element={<UserDashBoard/>}/>
    </Routes>
    
    </BrowserRouter>
    
    </>
  );
}

export default App;
