import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 bg-gray-100 overflow-auto relative">
          <div className="fixed top-0 left-16 right-0 z-10">
            <Navbar />
          </div>

          <div className="h-full w-full pt-16">
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
