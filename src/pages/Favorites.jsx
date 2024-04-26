import { useState, useEffect } from 'react';
import test from '../assets/test.jpg';
import loading from '../assets/loading.gif';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const unheart = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/unfave/${id}`, {
                method: 'DELETE',
                headers: { Accept: 'application/json',
                'Content-Type': 'application/json', },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // Remove the unfavored item from the favorites list
            setFavorites(favorites.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('JWT token not found in local storage');
                    return;
                }
    
                const response = await fetch('http://127.0.0.1:8000/api/favorites/all', {
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
                setFavorites(data.favorites);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex justify-center items-center">
                {/* Display the loading GIF centered and auto-looped */}
                <img src={loading} alt="loading" className="fixed right-0 w-40 " />
                <div className="flex ml-32 gap-3 flex-wrap">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="flex mt-10 flex-col bg-neutral-300 ml-4 w-80 h-96 animate-pulse rounded-xl p-4 gap-1">
                            <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                            <div className="flex flex-col gap-2">
                                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                                <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                                <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                            </div>
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
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-black">
            <div className="flex ml-32 gap-3 flex-wrap">
            {favorites.map((item, index) => (
    <div key={index} className="flex mt-10 flex-col bg-neutral-300 ml-4 w-96 h-auto rounded-xl p-4 gap-1">
        {item.recipe ? (
            // Render recipe
            <>
                <div className="bg-neutral-400/50 w-full h-32 rounded-md overflow-hidden">
                    <img className="object-cover w-full h-full" src={test} alt="" />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-lg font-bold font-serif">{item.recipe.title}</div>
                    <div className="font-serif">{item.recipe.ingrediants}</div>
                    <div className="w-full h-4 rounded-md">{item.recipe.cooking_time}</div>
                    <div className="w-2/4 h-4 rounded-md">{item.recipe.nutrition_information}</div>
                    <div>{item.recipe.description}</div>
                </div>
            </>
        ) : (
            // Render coach
            <>
                <div className="text-lg font-bold font-serif">Coach</div>
                {/* Render coach details if available */}
                {item.coach && (
                    <div className="font-serif">
                        Name: {item.coach.name}, Bio: {item.coach.bio}
                    </div>
                )}
            </>
        )}
        <div className="flex w-64 gap-2 p-4">
            <div className="h-12 w-12 rounded-full bg-neutral-400/50 overflow-hidden">
                {/* Render coach or user image */}
                <img className="object-cover w-full h-full" src={item.coach ? test : test} alt="" />
            </div>
            <div className="flex-1">
                {/* Render coach or user name */}
                <div className="mb-1 h-5 w-3/5 rounded-lg text-lg font-serif">{item.coach ? item.coach.name : 'User Name'}</div>
                {/* Render coach or user bio */}
                <div className="h-5 w-[90%] rounded-lg text-sm font-serif">{item.coach ? item.coach.bio : 'User Bio'}</div>
            </div>
            <div className=" bottom-5 right-0 h-4 w-4 rounded-full">
                <svg
                    className="ml-4 w-6 h-6 text-gray-800 dark:text-blue-600 "
                    
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                    />
                </svg>
            </div>
        </div>
        {/* Render common elements like likes */}
        <div className='flex'>
            <svg
            className="ml-4 mt-6 h-8 cursor-pointer "
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                onClick={() => unheart(item.id)}
                height="36"
                viewBox="0 0 28 20"
                fill="red"
                stroke="red"
            >
                <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
            </svg>
            <p className='mt-4 font-bold'><p className='mt-4 font-bold'>
  {item.coache_id !== null ? favorites.filter(fav => fav.coache_id === item.coache_id).length : null}
  {item.recipe_id !== null ? favorites.filter(fav => fav.recipe_id === item.recipe_id).length : null}
</p>
</p>
           
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
