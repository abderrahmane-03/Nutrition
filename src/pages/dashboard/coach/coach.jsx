import { useState, useEffect } from 'react';
import logo from "../../../assets/logo.png";
import { Link } from 'react-router-dom';
import Pusher from "pusher-js";

const Dashboardcoach = () => {
    const [Authuser, setAuthuser] = useState();
    const [Reservations, setClients] = useState([]);
    const [userId, setUserId] = useState(11);
    const [receiver, setReceiver] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [showClient, setShowClient] = useState(false);

    const fetchData = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/api/chatForm/11`, {
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
            setUserId(data.userId);
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
        fetchData();

        if (userId) {
            const pusher = new Pusher('650fb83f4efbd70b74ad', {
                cluster: 'eu'
            });

            const channel = pusher.subscribe(`chattest`);

            channel.bind('chatMessage', function (data) {
                setMessages(prevMessages => [...prevMessages, data]);
            });

            return () => {
                channel.unbind('chatMessage');
                pusher.unsubscribe(`chattest`);
            };
        }
    }, [userId]);

    const handleLogout = async () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    };

    const handleMessageSend = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:8000/api/chatMessage/11', {
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

    return (
        <>
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
                        <span>Client : {receiver.name}</span>
                        <div onClick={() => setShowClient(false)} className="relative inline-block">
                            <button onClick={() => setShowChat(!showChat)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">X</button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto  p-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex mt-1 ${message.sender === receiver.id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`bg-${message.sender === receiver.id ? 'green-200' : 'gray-300'} text-black p-2 rounded-lg max-w-xs`}>
                                    {message.message}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-4 flex items-center">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleMessageSend} className="bg-green-500 text-white rounded-full p-2 ml-2 hover:bg-green-600 focus:outline-none">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboardcoach;
