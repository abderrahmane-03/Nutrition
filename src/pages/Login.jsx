import googleAuth from "../assets/Gmail.png";
import { Link } from 'react-router-dom';
import logo from "../assets/logo2.png";
import twitter from "../assets/facebook_logo.png";

export default function Login(){
    return(
        <>
    <div className="flex justify-center items-center h-screen ">
        <div className="bg-green-300 w-96 rounded-xl">
            <div className='w-[80%] mx-auto flex flex-col gap-[1rem]'>
            <img src={logo} className='w-32 ml-24 h-24 p-3' alt="yy"/>
                
                <input type="text" placeholder='Email'
                       className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                <input type="password" placeholder='Password'
                       className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                <div className='w-full flex justify-end'>
                    <p className='text-main text-[0.9rem] font-medium cursor-pointer underline hover:text-gray'>Forgot Password?</p>
                </div>
            </div>
            <div className='w-[80%] mx-auto flex items-center justify-center'>
                <button className='w-full rounded-xl py-[0.75rem] bg-green-500 mt-2 mb-4 text-white font-medium hover:bg-hovers'>Sign In</button>
            </div>
            <div className='w-[80%] mx-auto flex justify-between items-center '>
                <div className='bg-gray w-[45%] h-[1px] rounded-lg'></div>
                <div className='text-gray'>OR</div>
                <div className='bg-gray w-[45%] h-[1px] rounded-lg'></div>
            </div>
            <div className='flex w-full justify-center items-center gap-[20px] py-[0.5rem]'>
                <div
                    className='w-[48px] h-[48px] flex items-center border-1 border rounded-xl justify-center cursor-pointer hover:bg-slate hover:border-primary'>
                    <img src={googleAuth} className='w-[24px] h-[24px]' alt=""/>
                </div>
                <div
                    className='w-[48px] h-[48px] flex items-center border-1 border rounded-xl justify-center cursor-pointer hover:bg-slate hover:border-primary'>
                    <img src={twitter} className='w-[24px] h-[24px]' alt=""/>
                </div>
            </div>
            <div className='w-[80%] mx-auto flex items-center justify-center'>
                <p className='text-gray font-medium text-[0.9rem]'> You dont have an account yet? <Link to="/Register" className="className='text-primary text-[1rem] cursor-pointer hover:text-hovers hover:underline no-underline">
        Sign In</Link></p>
            </div>
        </div>
    </div>
</>

    )
}