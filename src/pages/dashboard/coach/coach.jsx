import { useState, useEffect } from 'react';
import logo from "../../../assets/logo.png";
import { Link, Navigate } from 'react-router-dom';
import Pusher from "pusher-js";
import loading from '../../../assets/loading.gif';
import Echo from 'laravel-echo';

const Dashboardcoach = () => {
    const [Authuser, setAuthuser] = useState();
    const [Reservations, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [receiver, setReceiver] = useState();
    const [picture, setPicture] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [conversations, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [showClient, setShowClient] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const sortedConversations = Object.values(conversations).sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
    });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        cooking_time: '',
        ingrediants: '',
        instructions: '',
        picture: '',
        nutrition_information: '',
        // Default coach_id, you can change it according to your logic
    });

    const handleAddRecipe = () => {
        setShowForm(!showForm); // Toggle the state to show/hide the form
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.title || !formData.description || !formData.cooking_time || !formData.ingrediants || !formData.instructions || !formData.nutrition_information) {
            setError('All fields are required.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', formData.title);
            formData.append('description', formData.description);
            formData.append('cooking_time', formData.cooking_time);
            formData.append('ingrediants', formData.ingrediants);
            formData.append('instructions', formData.instructions);
            formData.append('nutrition_information', formData.nutrition_information);
            if (picture) {
                formData.append('picture', picture[0]); // Assuming picture is an array of files
            }

            const response = await fetch('http://127.0.0.1:8000/api/recipes/create', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }

            const data = await response.json();
            console.log(data);
            // Handle successful response
        } catch (error) {
            console.error('Error creating recipe:', error);
            // Handle error
        }
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


    const clients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:8000/api/bringClients', {
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
            setClients(data.reservations);
        } catch (error) {
            console.error('Error fetching User:', error);
        }
    };

    const coach = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:8000/api/Auth', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch AUTH');
            }

            const data = await response.json();
            setAuthuser(data.coach);
        } catch (error) {
            console.error('Error fetching Auth:', error);
        }
    };

    useEffect(() => {
        clients();
        coach();
    }, []);





    useEffect(() => {
        const recipes = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');


                const response = await fetch('http://127.0.0.1:8000/api/recipes/coach', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }

                const data = await response.json();
                if (Array.isArray(data.Recipes)) {
                    setRecipes(data.Recipes);
                } else {
                    console.error('Data received from API is not in the expected format:', data);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                // Introduce a delay before setting isLoading to false
                setTimeout(() => {
                    setIsLoading(false); // Set loading to false after fetching data
                }, 2000);
            }
        };

        recipes();
    }, []);


    const handleLogout = async () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    };

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

            const data = await response.json();
            setMessages(prevMessages => [...prevMessages, data.message]);
            setNewMessage("");
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const token = localStorage.getItem('token');


    useEffect(() => {
        const recipes = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');


                const response = await fetch('http://127.0.0.1:8000/api/recipes/coach', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }

                const data = await response.json();
                if (Array.isArray(data.Recipes)) {
                    setRecipes(data.Recipes);
                } else {
                    console.error('Data received from API is not in the expected format:', data);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                // Introduce a delay before setting isLoading to false
                setTimeout(() => {
                    setIsLoading(false); // Set loading to false after fetching data
                }, 2000);
            }
        };

        recipes();
    }, []);

    useEffect(() => {
        if (!token) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            // If user's role does not match requiredRole, redirect to login
            return <Navigate to="/login" replace />;
        }
    });


    return (
        <>
            {isLoading && ( // Render loading image when isLoading state is true
                <img src={loading} alt="loading" className="fixed  z-50 flex  right-0 bottom-0 w-40  justify-center items-center" />
            )}
            <div className='flex'>

                <div className='flex'>
                    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-green-800 dark:border-green-700">
                        <a href="#" className="mx-auto">
                            <img className="w-auto h-20" src={logo} alt="" />
                        </a>

                        {Authuser && (
                            <div className="flex flex-col items-center mt-6 -mx-2">
                                <img className="object-cover w-24 h-24 mx-2 rounded-full" src={`http://127.0.0.1:8000/${Authuser.user.profile_picture}`} alt="avatar" />
                                <h4 className="mx-2 mt-2 font-medium text-green-800 dark:text-green-200">{Authuser.user.name} {Authuser.user.lastname}</h4>
                                <p className="mx-2 mt-1 text-sm font-medium text-green-600 dark:text-green-400">{Authuser.user.email}</p>
                                <p className="mx-2 mt-1 text-sm font-medium text-green-600 dark:text-green-400">{Authuser.bio}</p>
                            </div>
                        )}

                        <div className="flex flex-col justify-between flex-1 mt-6">
                            <nav>
                                <a className="flex items-center px-4 py-2 mt-5 text-green-600 transition-colors duration-300 transform rounded-lg dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 dark:hover:text-green-200 hover:text-green-700" href="#">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="mx-4 font-medium">Recipes</span>
                                </a>

                                <a onClick={() => setShowChat(!showChat)} className="flex items-center px-4 py-2 mt-5 text-green-600 transition-colors duration-300 transform rounded-lg dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 dark:hover:text-green-200 hover:text-green-700" href="#">
                                    <svg className="w-6 h-6 text-green-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
                                    </svg>
                                    <span className="mx-4 font-medium">Chat</span>
                                </a>

                                <Link
                                    to="/login" onClick={handleLogout}
                                    className="flex items-center px-4 py-2 mt-5 text-green-600 transition-colors duration-300 transform rounded-lg dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 dark:hover:text-green-200 hover:text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
                                        <path d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M8 8L4 12M4 12L8 16M4 12L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="mx-4 font-medium">Logout</span>
                                </Link>
                            </nav>
                        </div>
                    </aside>

                    <div className="relative">
                        <div className={`fixed inset-y-0 right-[20rem] z-52 flex flex-col w-80 bg-white shadow-lg transition-transform duration-300 ${showClient ? 'transform translate-x-0' : 'transform translate-x-full hidden'}`}>
                            <div className="bg-green-700 p-4 text-white flex justify-between items-center">
                                <span>My Clients</span>
                                <div className="relative inline-block">
                                    <button onClick={() => setShowClient(!showClient)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">X</button>
                                </div>
                            </div>

                            {Reservations.map((reservation, reservationIndex) => (
                                <div key={reservationIndex} className="cursor-pointer mt-2 flex ml-2" onClick={() => fetchData(reservation.client.user.id)}>
                                    <img src={`http://127.0.0.1:8000/${reservation.client.user.profile_picture}`} className="object-cover w-10 h-10 mx-2 rounded-full" />
                                    <div className="flex flex-col ml-2">
                                        <span className="font-medium text-black">{reservation.client.user.name}</span>
                                        <span className="text-sm text-gray-400 truncate w-32">{reservation.client.interest}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={`fixed inset-y-0 right-0 z-52 flex flex-col w-80 bg-white shadow-lg transition-transform duration-300 ${showChat ? 'transform translate-x-0' : 'transform translate-x-full'}`} style={{ marginLeft: showChat ? '-80px' : '0px' }}>
                            <div className="bg-green-700 p-4 text-white flex justify-between items-center">
                                <button className="hover:bg-green-400 rounded-md p-1" onClick={() => setShowClient(!showClient)}>
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#ffffff" strokeWidth="1.5"></circle> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                                </button>
                                <span>Coach :  {receiver && receiver.name}</span>
                                <div onClick={() => setShowClient(false)} className="relative inline-block">
                                    <button onClick={() => setShowChat(!showChat)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">X</button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                            {sortedConversations.map((message, index) => {
      const isReceiver = message.sender === receiver.id;
      return (
        <div key={index} className={`flex mt-1 ${isReceiver ?  'justify-start': 'justify-end'}`}>
          <div className={`bg-${isReceiver ? 'gray-300':'green-200'  } text-black p-2 rounded-lg max-w-xs`}>
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
                    <div className="relative">
                        {/* Add Recipe Button */}
                        <button
                            onClick={handleAddRecipe}
                            className="absolute right-24 bottom-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                        >
                            {showForm ? 'Close Form' : 'Add Recipe'}
                        </button>
                        {/* Recipe Form */}
                        {showForm && (
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-green-300 w-auto rounded-xl p-6">
                                <img src={logo} className='w-28 ml-44 h-20 p-3' alt="yy" />
                                <div className="flex gap-2">
                                    <div className='w-[80%] mx-4 flex flex-col gap-[1rem]'>

                                        <input type="text" placeholder='Title*'
                                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'
                                            value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />

                                        <input type="text" placeholder='Description*'
                                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'
                                            value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />

                                        <input type="number" placeholder='Cooking Time*'
                                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'
                                            value={formData.cooking_time} onChange={(e) => setFormData({ ...formData, cooking_time: e.target.value })} required />

                                        <textarea placeholder="Ingredients*"
                                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'
                                            value={formData.ingrediants} onChange={(e) => setFormData({ ...formData, ingrediants: e.target.value })} required />

                                        <textarea placeholder="Instructions*"
                                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'
                                            value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} required />

                                        <textarea placeholder="Nutrition Information*"
                                            className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'
                                            value={formData.nutrition_information} onChange={(e) => setFormData({ ...formData, nutrition_information: e.target.value })} required />

                                    </div>
                                    <div className='w-[80%] mx-4 flex flex-col gap-[1rem]'>
                                        <div className="flex items-center ml-11 mt-5 mb-3 justify-center w-96">
                                            <label className="flex flex-col items-center justify-center w-full h-34 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-green-200">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload profile</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => setPicture(e.target.files)}
                                                />
                                            </label>
                                        </div>
                                        <div className=' mx-auto text-red-500 flex items-center justify-center'>
                                            {error}
                                        </div>
                                        <div className='w-[80%] mx-auto flex items-center justify-center'>
                                            <button className='w-full rounded-xl py-[0.75rem] bg-green-500 mt-2 mb-4 text-white font-medium hover:bg-hovers' type="submit">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>


                        )}
                    </div>
                    <div className="flex ml-32 gap-3 flex-wrap">
                        {recipes.map((recipe, index) => (
                            <div key={index} className="flex mt-10 gap-6  flex-col bg-green-300 ml-4 w-[27rem] h-96 rounded-xl p-4 ">
                                <div className="flex flex-col gap-2">
                                    <div className="flex">
                                    </div>
                                    <div className="bg-neutral-400/50 w-full h-32 rounded-md overflow-hidden">
                                        <img className="object-cover w-full h-full" src={`http://127.0.0.1:8000/${recipe.picture}`} alt="" />
                                    </div>
                                    <div className="text-lg font-bold font-serif">{recipe.title}</div>
                                    <div>{recipe.description}</div>
                                    <div className="font-serif">{recipe.ingredients}</div>
                                    <div className="w-full h-4 rounded-md">{recipe.cooking_time}</div>
                                    <div className="w-full h-4 rounded-md">{recipe.nutrition_information}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );

}

export default Dashboardcoach;
