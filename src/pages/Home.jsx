
import { Link } from 'react-router-dom';
export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex justify-center items-center ">
        <div className="hero-content text-center text-neutral-content">
        <div className="max-w-l ">
            <h1 className="mb-5  text-5xl font-bold">Welcome to Nutrition <span  className="text-green-500">Y</span>our life style is with us </h1>
            <p className="mb-5 font-bold">Don’t wait, grab our premium Services now up to <span  className="text-green-400">500</span> Verified Coaches and <span className="text-green-400">50.000</span> Users</p>
            <Link to="/Coach_register" className=" rounded-md p-2 bg-green-300 hover:bg-black text-lg hover:text-white ">Get Started as a Coach</Link>
            <p className="mb-5 mt-52 font-bold">Are you a recipes master wait, join us and start writing recipes for our clients <span  className="text-green-400">2000</span> Verified writers</p>
            <Link to="/Writer_register" className=" rounded-md p-2 bg-green-300 hover:bg-black text-lg hover:text-white ">Get Started as a writer</Link>
        </div>
    </div>
    </div>
    );
}
