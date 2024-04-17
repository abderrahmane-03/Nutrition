import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const [openCart, setOpenCart] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const products = [
    {
      id: 1,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: '$90.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    }
  ];

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
          to="/Home"
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

        {/* Cart Button */}

      </div>

      {/* Cart Content */}
      <div className={`fixed inset-y-0 right-0 z-50 flex flex-col w-80 bg-white shadow-lg transition-transform duration-300 ${openCart ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => setOpenCart(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        {/* Cart items and subtotal */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {products.map((product) => (
            <div key={product.id} className="py-2">
              {/* Display product details */}
              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-900">{product.name}</p>
                <p className="text-lg font-medium text-gray-900">{product.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              <p className="mt-1 text-sm text-gray-500">Qty {product.quantity}</p>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t">
          {/* Cart subtotal and checkout button */}
          <div className="flex justify-between">
            <p className="text-lg font-medium text-gray-900">Subtotal</p>
            <p className="text-lg font-medium text-gray-900">$262.00</p>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <p>Shipping and taxes calculated at checkout.</p>
          </div>
          <div className="mt-6">
            <Link onClick={() => setOpenCart(false)} to="/Checkout"
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Checkout
            </Link>
          </div>
        </div>


      </div>
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
     


      <div className="flex"><button onClick={() => setOpenCart(!openCart)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 7h13.79a2 2 0 0 1 1.99 2.199l-.6 6A2 2 0 0 1 18.19 17H8.64a2 2 0 0 1-1.962-1.608L5 7z" />
          <path d="M5 7l-.81-3.243A1 1 0 0 0 3.22 3H2" />
          <path d="M8 21h2" />
          <path d="M16 21h2" />
        </svg>
      </button>
        <Link
          to="/register"
          className="text-green-500 border-2 border-greentext-green-500 text-lg  rounded-lg w-auto text-center sm:text-left hover:border-black hover:text-black hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4"
        >
          Register now
        </Link>
        <Link
          to="/login"
          className="text-black border-2 border-black text-lg  rounded-lg w-auto text-center sm:text-left hover:border-green-600 hover:text-green-600 hover:bg-white hover:shadow-md px-6 py-1 my-2 sm:my-0 sm:ml-4"
        >
          Login
        </Link></div>
    </nav>
  );
}
