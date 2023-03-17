import Register from './Register';
import Field from './Field';
import './field.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  return (
    <main className="App">
      <div></div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/field" element={<Field />} />

          </Routes>
        </BrowserRouter>
        
        {/* <div className="header">
          <button className="button-1" onClick="openNav()">SB</button>
          <div className="button-2"></div>
          <div className="button-3"></div>
          <div className="button-4"></div>
        </div> */}
      
    </main>

  )
}

export default App;
