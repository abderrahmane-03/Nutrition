import googleAuth from "../../assets/Gmail.png";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo2.png";
import twitter from "../../assets/facebook_logo.png";
import { useState } from 'react';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State variable for error

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            if (data && data.authorisation && data.authorisation.token) {
                localStorage.setItem('token', data.authorisation.token);

                if (data && data.user && data.user.role) {
                    switch (data.user.role) {
                        case 'coach':
                            navigate('/dashboardcoach');
                            break;
                        case 'client':
                            navigate('/Recipes');
                            break;
                        case 'admin':
                            navigate('/dashboardadmin');
                            break;
                        default:
                            console.log("Role not recognized:", data.user.role);
                            navigate('/defaultRedirectPage');
                            break;
                    }
                }
            }
        } catch (error) {
            setError(error.message); // Set error state if an error occurs
        }
    }

    return (
        <>
           <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex justify-center items-center ">
                <div className="bg-green-300 w-96 rounded-xl">
                    <form onSubmit={submit}>
                        <div className='w-[80%] mx-auto flex flex-col gap-[1rem]'>
                            <img src={logo} className='w-32 ml-24 h-24 p-3' alt="yy"/>
                            <input
                                type="text"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                            <input
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                            <div className='w-full flex justify-end'>
                                <p className='text-main text-[0.9rem] font-medium cursor-pointer underline hover:text-gray'>Forgot Password?</p>
                            </div>
                        </div>
                        <div className='w-[80%] mx-auto flex items-center justify-center'>
                            <button type="submit" className='w-full rounded-xl py-[0.75rem] bg-green-500 mt-2 mb-4 text-white font-medium hover:bg-hovers'>Sign In</button>
                        </div>
                    </form>
                    <div className='w-[80%] mx-auto flex justify-between items-center '>
                        <div className='bg-gray w-[45%] h-[1px] rounded-lg'></div>
                        <div className='text-gray'>OR</div>
                        <div className='bg-gray w-[45%] h-[1px] rounded-lg'></div>
                    </div>
                    <div className='flex w-full justify-center items-center gap-[20px] py-[0.5rem]'>
                        <div className='w-[48px] h-[48px] flex items-center border-1 border rounded-xl justify-center cursor-pointer hover:bg-slate hover:border-primary'>
                            <img src={googleAuth} className='w-[24px] h-[24px]' alt=""/>
                        </div>
                        <div className='w-[48px] h-[48px] flex items-center border-1 border rounded-xl justify-center cursor-pointer hover:bg-slate hover:border-primary'>
                            <img src={twitter} className='w-[24px] h-[24px]' alt=""/>
                        </div>
                    </div>
                    <div className='w-[80%] mx-auto flex items-center justify-center'>
                        {error && <p className='text-red-500 font-medium'>{error}</p>} {/* Render error message if error state is not null */}
                        <p className='text-gray font-medium text-[0.9rem]'> You dont have an account yet? <Link to="/Client_register" className='text-primary text-[1rem] cursor-pointer hover:text-hovers hover:underline no-underline'>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;
