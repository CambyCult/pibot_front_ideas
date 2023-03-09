import Register from './Register';
import Field from './Field';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <main className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/field" element={<Field />} />

          </Routes>
        </BrowserRouter>
        
        <div className="header">
          <button class="button-1" onclick="openNav()">SB</button>
          <div class="button-2"></div>
          <div class="button-3"></div>
          <div class="button-4"></div>
        </div>
      
    </main>

  )
}

export default App;
