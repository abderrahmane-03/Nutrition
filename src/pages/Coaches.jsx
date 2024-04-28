import { useState, useEffect } from 'react';
import test from '../assets/test.jpg';
import loading from '../assets/loading.gif';
import { useStripe } from "@stripe/react-stripe-js";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Coaches() {
    const [coaches, setCoaches] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bicepload, setBicepload] = useState(false);
    const [coach_counts, setCoachCounts] = useState({}); 
    const stripe = useStripe();

    const handleRate = async (coach) => {
        try {
            setBicepload(true);
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }
            const response = await fetch("http://127.0.0.1:8000/api/Rate", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    
                    coach_id: coach,
                }),
            });
    
            // Check if response is successful
            if (!response.ok) {
                throw new Error("Failed to initiate rating");
            }
    
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
        }
    };

    const handlePayment = async (price, name, duration, coach) => {
        try {
           
            const token = localStorage.getItem('token');
        if (!token) {
            window.alert('You need to be logged in to perform this action.');
            return;
        }
            setBicepload(true);
             const response = await fetch("http://127.0.0.1:8000/api/checkout", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    amount: price,
                    name: name,
                    duration: duration,
                    coach_id: coach,
                }),
            });
    
            // Check if response is successful
            if (!response.ok) {
                throw new Error("Failed to initiate checkout");
            }
    
            // Parse JSON response
            const data = await response.json();
            const sessionId = data.sessionId;
    
            console.log("Session ID:", sessionId); // Log sessionId for debugging
    
            // Redirect to Stripe checkout
            redirectToStripeCheckout(sessionId);
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
        }
    };
    

    const redirectToStripeCheckout = async (sessionId) => {
        try {
            const { error } = await stripe.redirectToCheckout({
                sessionId,
            });
            if (error) {
                console.error("Stripe Checkout Error:", error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error redirecting to Stripe Checkout:", error);
            setIsLoading(false);
        }
    };
    

    const isFavorite = (coachId) => {
        return favorites.some((fav) => fav.coach_id === coachId);
    };

    const unheart = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/unfave/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.recipe_id !== id));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                
            }

            const response = await fetch('http://127.0.0.1:8000/api/favorites', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }

            const data = await response.json();
            if (Array.isArray(data.favorites)) {
                setFavorites(data.favorites);
                setCoachCounts(data.coach_counts);
            } else {
                console.error('Data received from API is not in the expected format:', data);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                
            }

            const response = await fetch('http://127.0.0.1:8000/api/Reservations', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch reservation');
            }

            const data = await response.json();
                setReservations(data.reservations);
           
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFavoriteToggle = async (id) => {
        try {
            const token = localStorage.getItem('token');
        if (!token) {
            window.alert('You need to be logged in to perform this action.');
            return;
        }

            const response = await fetch(`http://127.0.0.1:8000/api/fave/coach/${id}`, {
                method: isFavorite(id) ? 'DELETE' : 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            if (isFavorite(id)) {
                setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.coach_id !== id));
            } else {
                fetchFavorites();
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchCoaches = async () => {
            
            try {
                
                const response = await fetch('http://127.0.0.1:8000/api/coaches/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch coaches');
                }

                const data = await response.json();
                if (data.Coachs && Array.isArray(data.Coachs)) {
                    setCoaches(data.Coachs);
                } else {
                    console.error('Data received from API is not in the expected format:', data);
                }
            } catch (error) {
                console.error('Error fetching coaches:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoaches();
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, []);
    useEffect(() => {
        fetchReservations();
    }, []);
    if (bicepload) {
        return (
            <div>
                <div className="min-h-96 bg-gradient-to-b from-green-600 to-black bg-opacity-80 flex justify-center items-center">
                    <img src={loading} alt="loading" className="absolute w-44 " />
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex justify-center items-center">
                <img src={loading} alt="loading" className="fixed right-0 w-40 " />
                <div className="flex ml-32 gap-3 flex-wrap">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="flex mt-10 flex-col bg-neutral-300 ml-4 w-80 h-96 animate-pulse rounded-xl p-4 gap-1">
                            <div className="relative flex w-64 animate-pulse gap-2 p-4">
                                <div className="h-12 w-12 rounded-full bg-neutral-400/50"></div>
                                <div className="flex-1">
                                    <div className="mb-1 h-5 w-3/5 rounded-lg bg-neutral-400/50 text-lg"></div>
                                    <div className="h-5 w-[90%] rounded-lg bg-neutral-400/50 text-sm"></div>
                                </div>
                                <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-neutral-400/50"></div>
                            </div>
                            <div className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 28 20" fill="gray" stroke="gray"><path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 28 20" fill="gray" stroke="gray"><path d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172 2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828.653.654 1.528.943 2.828 1.07" /><path d="M12 11v.01" /><path d="M8 11v.01" /><path d="M16 11v.01" /><path d="M14 19c-1.236 0-2.598.5-3.841 1.145-1.998 1.037-2.997 1.556-3.489 1.225-.492-.33-.399-1.355-.212-3.404L6.5 17.5" /></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex  items-center ">
            <div className="flex ml-32 gap-3 flex-wrap">
                {coaches.map((coach, coachIndex) => (
                    <div key={coachIndex} className="flex mt-10 flex-col bg-neutral-300 ml-4 w-96 h-auto rounded-xl p-4 gap-1">
                        <div className="flex w-80 gap-2 p-4">
                            <div className="flex flex-col">
                                <div className="h-12 w-12 rounded-full bg-neutral-400/50 overflow-hidden">
                                    <img className="object-cover w-full h-full" src={test} alt="" />
                                </div>
                                <div className="text-sm font-serif">{coach.experience} yrs exp</div>
                                <Rating name="half-rating-read" defaultValue={coach.rating} precision={0.5} readOnly />
                            </div>
                            <div className="flex-1">
                                <div className="mb-1 h-5 w-3/5 rounded-lg text-lg font-serif">{coach.user.name}{(coach.verified===true)? <svg
                                    className="ml-4 w-6 h-6 text-gray-800 dark:text-blue-600 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                                    />
                                </svg>}</div>
                                <div className="h-5 w-[90%] rounded-lg text-sm font-serif">{coach.bio}</div>
                                <div className="text-lg mt-4 font-bold font-serif">{coach.sport}</div>
                                <div className="font-serif">-{coach.programme}</div>
                                <div className="font-serif">-{coach.duration}</div>
                                <div className="w-full h-4 rounded-md">{coach.services}</div>
                            </div>
                            <div className="bottom-5 right-0 h-4  rounded-full"></div>
                        </div>
                        <div className='flex'>
                            {favorites.some((favorite) => favorite.coache_id === coach.id) ? (
                                <svg
                                    className='mt-2 ml-3 cursor-pointer'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 28 20"
                                    fill="red"
                                    stroke='none'
                                    onClick={() => {
                                        const favId = favorites.find((favorite) => favorite.coache_id === coach.id).id;
                                        unheart(favId);
                                    }}
                                    style={{ transition: "fill 0.5s, stroke 0.5s" }}
                                >
                                    <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                                </svg>
                            ) : (
                                <svg
                                    className='mt-2 ml-3 cursor-pointer'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 28 20"
                                    fill="none"
                                    stroke="gray"
                                    onClick={() => {
                                        handleFavoriteToggle(coach.id);
                                    }}
                                    style={{ transition: "fill 0.5s, stroke 0.5s" }}
                                >
                                    <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                                </svg>
                            )}
                            {/* Use correct reference to coach_counts */}
                            <p className='mt-4 font-bold'>{coach_counts[coach.id] || 0}</p>
                            {reservations.some((reservation) => reservation.coach_id === coach.id) ? (
                              <button  onClick={() => handleRate(coach.id)} disabled={bicepload} className="ml-28 w-18 h-14 bg-green-400 rounded-md p-3 font-bold hover:bg-green-600">
                                    <Stack>
                                         <Rating name="no-value" value={null} />
                                    </Stack>
                                </button>
                            ) : (
                                 <div> <strong className='mt-4 ml-28'>{coach.price} MAD</strong>
                                
                                <button onClick={() => handlePayment(coach.price,coach.user.name,coach.duration,coach.id)} disabled={bicepload} className="ml-3 w-18 h-14 bg-green-400 rounded-md p-3 font-bold hover:bg-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-Cart">
                                        <path d="M5 7h13.79a2 2 0 0 1 1.99 2.199l-.6 6A2 2 0 0 1 18.19 17H8.64a2 2 0 0 1-1.962-1.608L5 7z"></path>
                                        <path d="M5 7l-.81-3.243A1 1 0 0 0 3.22 3H2"></path>
                                        <path d="M8 21h2"></path>
                                        <path d="M16 21h2"></path>
                                    </svg>
                                </button></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
