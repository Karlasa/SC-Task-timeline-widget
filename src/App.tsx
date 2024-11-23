import WidgetDemo from "./pages/WidgetDemo";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WidgetDemo />} />
      </Routes>
    </div>
  );
}

export default App;
