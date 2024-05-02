function Admin() {
   
      return (
        <div className="flex flex-row gap-8 justify-center">
            <div className="flex-1 ml-10 p-4 w-full md:w-1/2">
                <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
                    <div className="flex-1 bg-green-300 p-4 shadow rounded-lg md:w-1/2">
                        <h2 className="text-black text-lg font-semibold pb-1">Clients</h2>
                        <div className="my-1"></div>
                        <div className="bg-green-700 h-px mb-6"></div>
                        <div className="flex">
                            <svg className="w-6 h-6 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            </svg>
                            <span className="py-2 px-8 bg-green-700est font-bold uppercase text-l text-green-700 "></span>
                            <h3 className="py-2 px-4 bg-green-700est font-bold uppercase text-sm text-black border-b border-green-700">Active Users</h3>
                        </div>
                    </div>
                    <div className="flex-1 bg-green-300 p-4 shadow rounded-lg md:w-1/2">
                        <h2 className="text-black text-lg font-semibold pb-1">Coaches</h2>
                        <div className="my-1"></div>
                        <div className="bg-green-700 h-px mb-6"></div>
                        <div className="flex">
                            <svg className="ml-4 mb-6 w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="worker">
                                <g data-name="Layer 16">
                                    <path d="M29.17 36H24a1 1 0 0 1-1-1v-1.76A11.07 11.07 0 0 0 29.24 27H30a4 4 0 0 0 0-8v-1h3a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-1A12 12 0 0 0 20 1h-2A12 12 0 0 0 6.05 12H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1a4 4 0 0 0 0 8h.76A11.07 11.07 0 0 0 15 33.24V35a1 1 0 0 1-1 1H8.83A7.82 7.82 0 0 0 1 43.83V62a1 1 0 0 0 1 1h34a1 1 0 0 0 1-1V43.83A7.82 7.82 0 0 0 29.17 36zM32 23a2 2 0 0 1-2 2h-.19a11 11 0 0 0 .19-2v-2a2 2 0 0 1 2 2zM20 3v5h-2V3zm-4 .2V9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3.2a10 10 0 0 1-6 0zm-4 5h2V3H8zM7 23a2 2 0 0 1-2-2v-2a11 11 0 0 0 .19 2H5a2 2 0 0 1-2-2v-5h2v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a10 10 0 0 1-6 0zM2 36h4a1 1 0 0 0 1-1v-4a10 10 0 0 1-6 0v4a1 1 0 0 0 1 1zm29 22H5V45.83A5.82 5.82 0 0 1 10.17 40h15.66A5.82 5.82 0 0 1 31 45.83V58z" fill="#4a5568"></path>
                                    <path d="M32 58h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z" fill="#4a5568"></path>
                                </g>
                            </svg>
                            <span className="py-2 px-8 bg-green-700est font-bold uppercase text-l text-green-700 "></span>
                            <h3 className="py-2 px-4 bg-green-700est font-bold uppercase text-sm text-black border-b border-green-700">Active Coaches</h3>
                        </div>
                    </div>
                </div>
                <div className="my-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
                    <div className="flex-1 bg-green-300 p-4 shadow rounded-lg md:w-1/2">
                        <h2 className="text-black text-lg font-semibold pb-1">Reservations</h2>
                        <div className="my-1"></div>
                        <div className="bg-green-700 h-px mb-6"></div>
                        <div className="flex">
                            <svg className="w-6 h-6 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            </svg>
                            <span className="py-2 px-8 bg-green-700est font-bold uppercase text-l text-green-700 "></span>
                            <h3 className="py-2 px-4 bg-green-700est font-bold uppercase text-sm text-black border-b border-green-700">Total Reservations</h3>
                        </div>
                    </div>
                    <div className="flex-1 bg-green-300 p-4 shadow rounded-lg md:w-1/2">
                        <h2 className="text-black text-lg font-semibold pb-1">Recipes</h2>
                        <div className="my-1"></div>
                        <div className="bg-green-700 h-px mb-6"></div>
                        <div className="flex">
                            <svg className="w-6 h-6 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            </svg>
                            <span className="py-2 px-8 bg-green-700est font-bold uppercase text-l text-green-700 "></span>
                            <h3 className="py-2 px-4 bg-green-700est font-bold uppercase text-sm text-black border-b border-green-700">Recipes</h3>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-12">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-green-200 text-white">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                <h3 className="font-semibold text-lg text-white">Card Tables</h3>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto ">
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                <th className="px-6 align-middle border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-green-300 text-indingo-300 border-2 border-green-400">Profile</th>
                                    <th className="px-6 align-middle border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-green-300 text-indingo-300 border-2 border-green-400">Name</th>
                                    <th className="px-6 align-middle border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-green-300 text-indingo-300 border-2 border-green-400">Lastname</th>
                                    <th className="px-6 align-middle border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-green-300 text-indingo-300 border-2 border-green-400">Email</th>
                                    <th className="px-6 align-middle border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-green-300 text-indingo-300 border-2 border-green-400">Verified</th>
                                    <th className="px-6 align-middle border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-green-300 text-indingo-300 border-2 border-green-400">Restriction</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                        <img src="https://demos.creative-tim.com/notus-js/assets/img/bootstrap.jpg" className="h-12 w-12 bg-white rounded-full border" alt="..." />
                                        
                                    </td>
                                    
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 text-left items-center  whitespace-nowrap ">
                                       <span className="inline-flex ml-3 font-bold text-white"> artisan </span>
                                    </td><td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 text-left items-center  whitespace-nowrap ">
                                       <span className="inline-flex ml-3 font-bold text-white"> artisan </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <i className="fas fa-circle text-orange-500 mr-2"></i>message
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <div className="flex">created at</div>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <div className="flex gap-2 items-center">
                                            <a className="px-4 py-2 bg-green-400 rounded-lg hover:bg-green-300" href="">Ban</a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
        

    );
}

export default Admin;
