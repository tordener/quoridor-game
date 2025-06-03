import RegisterWidget from "../components/RegisterWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Register(){
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-t from-cyan-700 to-gray-900 text-white">
            <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center">
        <RegisterWidget />
      </div>

      <Footer />
        </div>
    );
}