import "./App.css";
import { Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Lobby />}></Route>
          <Route path="/room/:roomId" element={<Room />}></Route>
      </Routes>
    </>
  );
}

export default App;
