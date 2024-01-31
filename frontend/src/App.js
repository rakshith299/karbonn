import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import FileUpload from './Components/FileUpload';
import Result from './Components/Result';
import { useState } from 'react';


function App() {

  const [result, setResult] = useState();



  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<FileUpload setResult = {setResult}/>} />
        <Route path = "/result" element = {<Result result = {result}/>}  />        
     </Routes>
    </BrowserRouter>
  );
}

export default App;
