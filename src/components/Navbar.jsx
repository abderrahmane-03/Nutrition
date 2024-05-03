import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import Echo from 'laravel-echo';

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
  
    const handleToggleMenu = () => {
      setShowMenu(!showMenu);
    };
  const [newMessage, setNewMessage] = useState("");
  const [activeLink, setActiveLink] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [Coaches, setCoaches] = useState([]);
  const [showClient, setShowClient] = useState(false);
  const [conversations, setConversation] = useState([]);
  const [receiver, setReceiver] = useState();
  const sortedConversations = Object.values(conversations).sort((a, b) => {
    return new Date(a.created_at) - new Date(b.created_at);
});
  const handleLogout = async () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  const token = localStorage.getItem('token');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const fetchData = async (userId) => {
    try {
      if (!userId) {
        // If userId is undefined, return early without making the fetch request
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/chatForm/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch receiver');
      }

      const data = await response.json();
      setReceiver(data.receiver);

      setConversation(data.messages);

      const options = {
        broadcaster: 'pusher',
        key: '650fb83f4efbd70b74ad',
        cluster: 'eu',
      };
      const echo = new Echo(options);
      echo.channel('chattestt')
        .listen('.chatMessage', () => {
          fetchData(userId); // Fetch messages again with the same userId when a new message event is received
        });

    } catch (error) {
      console.error('Error fetching User:', error);
    }
  };

  const Reservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/Reservations', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Clients');
      }

      const data = await response.json();
      setCoaches(data.reservations);
    } catch (error) {
      console.error('Error fetching User:', error);
    }
  };

  useEffect(() => {
    Reservations();
  }, []);

  const handleMessageSend = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/chatMessage/${receiver.id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ receiver: receiver.id, message: newMessage })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

       await response.json();
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };



  if (!token) {
    return (
      
      <nav className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white sm:bg-transparent shadow sm:shadow-none">
        {/* Logo */}
        <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
          <Link to="/" className="no-underline">
            <img src={logo} className="w-30 h-24" alt="" />
          </Link>
        </div>
        {/* Navigation Links */}
        <div id="menu" className="w-full sm:w-auto self-end sm:self-center hidden sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0">
          <Link to="/" className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Home' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/Home')}>Home</Link>
          <Link to="/Recipes" className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Recipes' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/Recipes')}>Recipes</Link>
          <Link to="/Coaches" className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Coaches' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/Coaches')}>Coaching</Link>
          <Link to="/BMRCalculator" className={`mr-80 text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/BMRCalculator' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/BMRCalculator')}>BMR Calculator</Link>
        </div>
        {/* Authentication Links */}
        <div className="flex">
          <Link to="/client_register" className="text-green-500 border-2 border-greentext-green-500 text-lg  rounded-lg w-auto text-center sm:text-left hover:border-black hover:text-black hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4">Register now</Link>
          <Link to="/login" className="text-black border-2 border-black text-lg  rounded-lg w-auto text-center sm:text-left hover:border-green-600 hover:text-green-600 hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4">Login</Link>
          <Link to="/coach_register" className="text-green-500 border-2 border-greentext-green-500 text-lg  rounded-lg w-auto text-center sm:text-left hover:border-black hover:text-black hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4">Be a Coach</Link>
        </div>
      </nav>
    );
  } else {
    return (
      <>
      <nav className="sm:hidden flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white sm:bg-transparent shadow sm:shadow-none">
      {/* Logo */}
      <div className="w-full ml-44 sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
        <Link to="/home" className="no-underline">
          <img src={logo} className="w-30 h-24" alt="" />
        </Link>
      </div>

      {/* Burger Menu */}
      <div className="sm:hidden">
        <button onClick={handleToggleMenu} className="text-black">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zM3 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`w-full sm:w-auto self-end sm:self-center flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 ${showMenu ? 'block' : 'hidden'}`}>
        <Link to="/" className="text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg">Home</Link>
        <Link to="/recipes" className="text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg">Recipes</Link>
        <Link to="/coaches" className="text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg">Coaching</Link>
        <Link to="/bmr-calculator" className=" text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg">BMR Calculator</Link>
        <Link to="/favorites" className="text-lg text-black rounded-lg">Favorites</Link>
        <div className="cursor-pointer mt-3 chat button" onClick={() => setShowChat(!showChat)}>
          <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
          </svg>
        </div>
      </div>

      {/* Sign out Button */}
      <Link to="/login" onClick={handleLogout} className="cursor-pointer text-green-500 border-2 border-green-500 text-lg  rounded-lg w-auto text-center sm:text-left hover:border-black hover:text-black hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4">Sign out</Link>
    </nav>
      <nav className="hidden sm:flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white sm:bg-transparent shadow sm:shadow-none">
        {/* Logo */}
        <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
          <Link to="/home" className="no-underline">
            <img src={logo} className="w-30 h-24" alt="" />
          </Link>
        </div>
        {/* Chat */}
        <div className="cursor-pointer chat button" onClick={() => setShowChat(!showChat)}>
          <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
          </svg>
        </div>
        {/* Navigation Links */}
        <div id="menu" className="w-full sm:w-auto self-end sm:self-center hidden sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0">
          <Link to="/" className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Home' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/Home')}>Home</Link>
          <Link to="/Recipes" className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Recipes' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/Recipes')}>Recipes</Link>
          <Link to="/Coaches" className={`text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/Coaches' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/Coaches')}>Coaching</Link>
          <Link to="/BMRCalculator" className={`mr-80 text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 text-black rounded-lg ${activeLink === '/BMRCalculator' ? ' text-lg w-auto px-6 py-1 my-2 sm:my-0 sm:ml-4 border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/BMRCalculator')}>BMR Calculator</Link>
          <Link to="/Favorites" className={`text-lg  text-black rounded-lg ${activeLink === '/Favorites' ? ' text-lg w-auto px-1  border-green-500  border-b-2 text-green-500 bg-white rounded-none shadow-md' : ''}`} onClick={() => handleLinkClick('/Favorites')}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#F2003C" height="2rem" width="2rem" version="1.1" id="Layer_1" viewBox="0 0 512.001 512.001" xmlSpace="preserve">
              <g>
                <g>
                  <path d="M378.154,33.557c-64.734,0-103.042,45.167-122.344,78.04c-19.301-32.873-57.609-78.04-122.344-78.04    C57.376,33.557,0,94.631,0,175.62c0,102.358,105.514,179.334,244.953,298.806c3.123,2.683,6.989,4.018,10.856,4.018    s7.733-1.341,10.856-4.018c8.288-7.104,16.415-14.021,24.417-20.813c-46.735-40.907-80.141-78.414-80.141-130.662    c0-62.171,47.117-110.869,107.268-110.869c22.071,0,42.343,6.386,59.944,18.725c17.601-12.339,37.874-18.725,59.944-18.725    c23.414,0,44.798,7.451,62.253,20.13c7.457-18.854,11.269-37.61,11.269-56.592C511.62,94.631,454.244,33.557,378.154,33.557z" />
                </g>
              </g>
              <g>
                <g>
                  <path d="M438.098,245.449c-28.849,0-48.073,15.901-59.944,31.33c-11.872-15.429-31.096-31.33-59.944-31.33    c-41.442,0-73.901,34.045-73.901,77.503c0,54.031,53.044,92.123,123.05,151.528c3.112,2.645,6.957,3.964,10.796,3.964    c3.839,0,7.684-1.32,10.796-3.964c70.029-59.426,123.05-97.506,123.05-151.528C512,279.494,479.534,245.449,438.098,245.449z" />
                </g>
              </g>
            </svg>
          </Link>
        </div>
        {/* Cart Content */}
        <div className="relative">
          <div className={`fixed inset-y-0 left-[20rem] z- flex flex-col w-80 bg-white shadow-lg transition-transform duration-300 ${showClient ? 'transform translate-x-0' : 'transform translate-x-full hidden'}`}>
            <div className="bg-green-700 p-4 text-white flex justify-between items-center">
              <span>My Coaches</span>
              <div className="relative inline-block">
                <button onClick={() => setShowClient(!showClient)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">X</button>
              </div>
            </div>
            {Coaches.map((reservation, reservationIndex) => (
              <div key={reservationIndex} className="cursor-pointer mt-2 flex ml-2" onClick={() => fetchData(reservation.coach.user.id)}>
                <img src={`http://127.0.0.1:8000/${reservation.coach.user.profile_picture}`} className="object-cover w-10 h-10 mx-2 rounded-full" />
                <div className="flex flex-col ml-2">
                  <span className="font-medium text-black">{reservation.coach.user.name}</span>
                  <span className="text-sm text-gray-400 truncate w-32">{reservation.coach.bio}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={`fixed inset-y-0 left-0 z-50 flex flex-col w-80 bg-white shadow-lg transition-transform duration-300 ${showChat ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
            <div className="bg-green-700 p-4 text-white flex justify-between items-center">
              <button id="login" onClick={() => setShowClient(!showClient)} className="hover:bg-green-400 rounded-md p-1">
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#ffffff" strokeWidth="1.5"></circle> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
              </button>
              <span>Coach :  {receiver && receiver.name}</span>
                                <div onClick={() => setShowClient(false)} className="relative inline-block">
                <button onClick={() => setShowChat(!showChat)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">X</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
            {sortedConversations.map((message, index) => {
      const isReceiver = message.sender === receiver.id;
      return (
        <div key={index} className={`flex mt-1 ${isReceiver ? 'justify-start' : 'justify-end'}`}>
          <div className={`bg-${isReceiver ?  'gray-300': 'green-200'} text-black p-2 rounded-lg max-w-xs`}>
            {message.message}
          </div>
        </div>
      );
    })}

</div>


            <div className="bg-white p-4 flex items-center">
              <input type="text" placeholder="Type your message..." className="flex-1 border rounded-md p-2 mr-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
              <button onClick={handleMessageSend} className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700">Send</button>
            </div>
          </div>
        </div>
        {/* Profile Menu */}
        <Link  to="/login" onClick={handleLogout} className="cursor-pointer text-green-500 border-2 border-greentext-green-500 text-lg  rounded-lg w-auto text-center sm:text-left hover:border-black hover:text-black hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4">Sign out</Link>
       
      </nav>
      </>
    );
  }

}