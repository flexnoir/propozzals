import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./routes/Landing.jsx";
import Editor from "./routes/Editor.jsx";
import Success from "./routes/Success.jsx";
import Cancel from "./routes/Cancel.jsx";
import Privacy from "./routes/Privacy.jsx";
import Terms from "./routes/Terms.jsx";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/editor" element={<Editor/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cancel" element={<Cancel/>} />
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/terms" element={<Terms/>} />
      </Routes>
    </BrowserRouter>
  );
}
