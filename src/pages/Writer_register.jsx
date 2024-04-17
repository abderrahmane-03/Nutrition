import googleAuth from "../assets/Gmail.png";

import logo from "../assets/logo2.png";
import twitter from "../assets/facebook_logo.png";
export default function register() {
    return (
        <>
            <div className="flex justify-center mt-8 items-center h-screen ">
                <div className="bg-green-300 w-96 rounded-xl">
                    <div className='w-[80%] mx-auto flex flex-col gap-[1rem]'>
                        <img src={logo} className='w-24 ml-28 h-20 p-3' alt="yy" />
                        <input type="text" placeholder='Name'
                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none' />
                        <input type="text" placeholder='Lastname'
                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none' />
                        <input type="text" placeholder='username'
                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none' />
                        <input type="text" placeholder='Email'
                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none' />
                        <input type="password" placeholder='Password'
                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none' />
                        <div
                                className="flex flex-col items-center gap-4 overflow-hidden rounded-md p-6 "
                            >
                                <span
                                    className="text-center font-mono text-base font-black uppercase text-neutral-600"
                                >Please select your gender</span
                                >
                                <div className="flex items-center gap-4">
                                    <div className="relative flex h-[50px] w-[50px] items-center justify-center">
                                        <input
                                            type="radio"
                                            id="radio"
                                            name="gender"
                                            value="male"
                                            className="peer z-10 h-full w-full cursor-pointer opacity-0"
                                        />
                                        <div
                                            className="absolute h-full w-full rounded-full bg-blue-100 p-4 shadow-sm shadow-[#00000050] ring-blue-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
                                        ></div>
                                        <div
                                            className="absolute -z-10 h-full w-full scale-0 rounded-full bg-blue-200 duration-500 peer-checked:scale-[500%]"
                                        ></div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="50px"
                                            height="50px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="absolute stroke-blue-400"
                                        >
                                            <path
                                               d="M15.5631 16.1199C14.871 16.81 13.9885 17.2774 13.0288 17.462C12.0617 17.6492 11.0607 17.5459 10.1523 17.165C8.29113 16.3858 7.07347 14.5723 7.05656 12.5547C7.04683 11.0715 7.70821 9.66348 8.8559 8.72397C10.0036 7.78445 11.5145 7.4142 12.9666 7.71668C13.9237 7.9338 14.7953 8.42902 15.4718 9.14008C16.4206 10.0503 16.9696 11.2996 16.9985 12.6141C17.008 13.9276 16.491 15.1903 15.5631 16.1199Z"
                                                ></path>
                                            <path
                                                d="M14.9415 8.60977C14.6486 8.90266 14.6486 9.37754 14.9415 9.67043C15.2344 9.96332 15.7093 9.96332 16.0022 9.67043L14.9415 8.60977ZM18.9635 6.70907C19.2564 6.41617 19.2564 5.9413 18.9635 5.64841C18.6706 5.35551 18.1958 5.35551 17.9029 5.64841L18.9635 6.70907ZM16.0944 5.41461C15.6802 5.41211 15.3424 5.74586 15.3399 6.16007C15.3374 6.57428 15.6711 6.91208 16.0853 6.91458L16.0944 5.41461ZM18.4287 6.92872C18.8429 6.93122 19.1807 6.59747 19.1832 6.18326C19.1857 5.76906 18.8519 5.43125 18.4377 5.42875L18.4287 6.92872ZM19.1832 6.17421C19.1807 5.76001 18.8429 5.42625 18.4287 5.42875C18.0145 5.43125 17.6807 5.76906 17.6832 6.18326L19.1832 6.17421ZM17.6973 8.52662C17.6998 8.94082 18.0377 9.27458 18.4519 9.27208C18.8661 9.26958 19.1998 8.93177 19.1973 8.51756L17.6973 8.52662ZM16.0022 9.67043L18.9635 6.70907L17.9029 5.64841L14.9415 8.60977L16.0022 9.67043ZM16.0853 6.91458L18.4287 6.92872L18.4377 5.42875L16.0944 5.41461L16.0853 6.91458ZM17.6832 6.18326L17.6973 8.52662L19.1973 8.51756L19.1832 6.17421L17.6832 6.18326Z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="relative flex h-[50px] w-[50px] items-center justify-center">
                                        <input
                                            type="radio"
                                            id="radio"
                                            name="gender"
                                            value="female"
                                            className="peer z-10 h-full w-full cursor-pointer opacity-0"
                                        />
                                        <div
                                            className="absolute h-full w-full rounded-full bg-pink-100 p-2 shadow-sm shadow-[#00000050] ring-pink-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
                                        ></div>
                                        <div
                                            className="absolute -z-10 h-full w-full scale-0 rounded-full bg-pink-200 duration-500 peer-checked:scale-[500%]"
                                        ></div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="35px"
                                            height="35px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="absolute fill-pink-400"
                                        >
                                            <path
                                              d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
                                            ></path>
                                        </svg>
                                    </div>
                                    
                                </div>
                            </div><div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-34 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-green-200">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor"  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload profile</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
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
                            <img src={googleAuth} className='w-[24px] h-[24px]' alt="" />
                        </div>
                        <div
                            className='w-[48px] h-[48px] flex items-center border-1 border rounded-xl justify-center cursor-pointer hover:bg-slate hover:border-primary'>
                            <img src={twitter} className='w-[24px] h-[24px]' alt="" />
                        </div>
                    </div>
                    <div className='w-[80%] mx-auto flex items-center justify-center'>
                        <p className='text-gray font-medium text-[0.9rem]'> You already have an account ? <span className='text-primary text-[1rem] cursor-pointer hover:text-hovers hover:underline'>Login</span></p>
                    </div>
                </div>
            </div>
        </>

    )
}