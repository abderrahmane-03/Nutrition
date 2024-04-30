import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Navbar() {
  const [activeLink, setActiveLink] = useState(null);
  const handleLogout = async () =>
           {
            localStorage.removeItem('token');   
          }

        
          const token = localStorage.getItem('token');
         
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const [showChat, setShowChat] = useState(false);
   if (!token) {
    return (
      <nav className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white sm:bg-transparent shadow sm:shadow-none">
        <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
          <Link to="/" className="no-underline">
            <img src={logo} className='w-30 h-24' alt="" />
          </Link>
        </div>
         <div
          id="menu"
          className="w-full sm:w-auto self-end sm:self-center hidden sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0"
        >
          {/* Navigation Links */}
          <Link
            to="/"
            className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Home' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
            onClick={() => handleLinkClick('/Home')}
          >
            Home
          </Link>
          <Link
            to="/Recipes"
            className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Recipes' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
            onClick={() => handleLinkClick('/Recipes')}>
            Recipes
          </Link>
          <Link
            to="/Coaches"
            className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Coaches' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
            onClick={() => handleLinkClick('/Coaches')}
          >
            Coaching
          </Link>
          <Link
            to="/BMRCalculator"
            className={`mr-80 text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/BMRCalculator' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
            onClick={() => handleLinkClick('/BMRCalculator')}
          >
            BMR Calculator
          </Link>
          
        </div>
       
  
        <div className="flex">
          <Link
            to="/client_register"
            className="text-green-500 border-2 border-greentext-green-500 text-lg  rounded-lg w-auto text-center sm:text-left hover:border-black hover:text-black hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4"
          >
            Register now
          </Link>
          <Link
            to="/login"
            className="text-black border-2 border-black text-lg  rounded-lg w-auto text-center sm:text-left hover:border-green-600 hover:text-green-600 hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4"
          >
            Login
          </Link>
          </div>
      </nav>
    );
          }else{
            return (
              <nav className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white sm:bg-transparent shadow sm:shadow-none">
                <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
                  <Link to="/home" className="no-underline">
                    <img src={logo} className='w-30 h-24' alt="" />
                  </Link>
                </div>
                <div className="cursor-pointer chat button" onClick={() => setShowChat(!showChat)}>
                  <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
                  </svg>
                </div> <div
                  id="menu"
                  className="w-full sm:w-auto self-end sm:self-center hidden sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0"
                >
                  {/* Navigation Links */}
                  <Link
                    to="/"
                    className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Home' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
                    onClick={() => handleLinkClick('/Home')}
                  >
                    Home
                  </Link>
                  <Link
                    to="/Recipes"
                    className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Recipes' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
                    onClick={() => handleLinkClick('/Recipes')}>
                    Recipes
                  </Link>
                  <Link
                    to="/Coaches"
                    className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Coaches' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
                    onClick={() => handleLinkClick('/Coaches')}
                  >
                    Coaching
                  </Link>
                  <Link
                    to="/BMRCalculator"
                    className={`mr-80 text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/BMRCalculator' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
                    onClick={() => handleLinkClick('/BMRCalculator')}
                  >
                    BMR Calculator
                  </Link>
                  <Link
                    to="/Favorites"
                    className={`text-lg  text-black rounded-lg ${activeLink === '/Favorites' ? ' text-lg w-auto px-1  border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`}
                    onClick={() => handleLinkClick('/Favorites')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#F2003C" height="2rem" width="2rem" version="1.1" id="Layer_1" viewBox="0 0 512.001 512.001" xmlSpace="preserve">
<g>
	<g>
		<path d="M378.154,33.557c-64.734,0-103.042,45.167-122.344,78.04c-19.301-32.873-57.609-78.04-122.344-78.04    C57.376,33.557,0,94.631,0,175.62c0,102.358,105.514,179.334,244.953,298.806c3.123,2.683,6.989,4.018,10.856,4.018    s7.733-1.341,10.856-4.018c8.288-7.104,16.415-14.021,24.417-20.813c-46.735-40.907-80.141-78.414-80.141-130.662    c0-62.171,47.117-110.869,107.268-110.869c22.071,0,42.343,6.386,59.944,18.725c17.601-12.339,37.874-18.725,59.944-18.725    c23.414,0,44.798,7.451,62.253,20.13c7.457-18.854,11.269-37.61,11.269-56.592C511.62,94.631,454.244,33.557,378.154,33.557z"/>
	</g>
</g>
<g>
	<g>
		<path d="M438.098,245.449c-28.849,0-48.073,15.901-59.944,31.33c-11.872-15.429-31.096-31.33-59.944-31.33    c-41.442,0-73.901,34.045-73.901,77.503c0,54.031,53.044,92.123,123.05,151.528c3.112,2.645,6.957,3.964,10.796,3.964    c3.839,0,7.684-1.32,10.796-3.964c70.029-59.426,123.05-97.506,123.05-151.528C512,279.494,479.534,245.449,438.098,245.449z"/>
	</g>
</g>
</svg>
                  </Link>
                </div>
                
          
                {/* Cart Content */}
                
                <div className={`fixed inset-y-0 left-0 z-50 flex flex-col w-80 bg-white shadow-lg transition-transform duration-300 ${showChat ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
               <div className="bg-green-500 p-4 text-white flex justify-between items-center">
                    <button id="login" className="hover:bg-green-400 rounded-md p-1">
                      <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#ffffff" strokeWidth="1.5"></circle> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                    </button>
                    <span>Hammouda</span>
                    <div className="relative inline-block text-left">
                    <button onClick={() => setShowChat(false)}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >X</button>
                    </div>
                  </div>
          
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="flex flex-col space-y-2">
          
                      <div className="flex justify-end">
                        <div className="bg-green-200 text-black p-2 rounded-lg max-w-xs">
                          Hey, hows your day going?
                        </div>
                      </div>
          
                      <div className="flex">
                        <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                          Not too bad, just a bit busy. How about you?
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-green-200 text-black p-2 rounded-lg max-w-xs">
                          I Am good, thanks. Anything exciting happening?
                        </div>
                      </div>
          
          
          
                    </div>
                  </div>
          
                  <div className="bg-white p-4 flex items-center">
                    <input type="text" placeholder="Type your message..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none" />
                    <button className="bg-green-500 text-white rounded-full p-2 ml-2 hover:bg-green-600 focus:outline-none">
                      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                  </div>
          
                </div>
               
          
                <div className="flex">
                  
                  <Link
                    to="/login" onClick={handleLogout}
                    className="text-green-500 border-2 border-greentext-green-500 text-lg  rounded-lg w-auto text-center sm:text-left hover:border-black hover:text-black hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4"
                  >
                    logout
                  </Link></div>
              </nav>
            );
          }  
}
