import LoginWidget from "../components/LoginWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login(){
    return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Navbar />


      <div className="flex-grow flex flex-col items-center justify-center">
        <LoginWidget />
      </div>

      <Footer />
    </div>
    );
}