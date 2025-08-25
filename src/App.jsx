import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./routes/Landing.jsx";
import Editor from "./routes/Editor.jsx";
import Success from "./routes/Success.jsx";
import Cancel from "./routes/Cancel.jsx";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/editor" element={<Editor/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cancel" element={<Cancel/>} />
      </Routes>
    </BrowserRouter>
  );
}
