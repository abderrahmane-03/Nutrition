import { useState, useEffect } from 'react';
import test from '../assets/test.jpg';
import loading from '../assets/loading.gif';

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    const isFavorite = (recipeId) => {
        return favorites.some((fav) => fav.recipe_id === recipeId);
    };

    const unheart = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/unfave/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // Update favorites state using the callback function form of setFavorites
            setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/api/favorites/all', {
                method: 'GET',
                headers: {
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
            } else {
                console.error('Data received from API is not in the expected format:', data);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
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

                const response = await fetch('http://127.0.0.1:8000/api/recipes/all', {
                    method: 'GET',
                    headers: {
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
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Fetch favorites on initial load
        fetchFavorites();
    }, []);

    const handleFavoriteToggle = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await fetch(`http://127.0.0.1:8000/api/fave/recipe/${id}`, {
                method: isFavorite(id) ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // Update favorites state based on the action (add or remove favorite)
            if (isFavorite(id)) {
                // If a favorite is being removed, filter it out from the state
                setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.recipe_id !== id));
            } else {
                // If a new favorite is being added, fetch the updated favorites and set the state
                fetchFavorites(); // Fetch updated favorites
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };


    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex justify-center items-center">
                {/* Display the loading GIF centered and auto-looped */}
                <img src={loading} alt="loading" className="fixed right-0 w-40 " />
                <div className="flex ml-32 gap-3 flex-wrap">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="flex mt-10 flex-col bg-neutral-300 ml-4 w-80 h-96 animate-pulse rounded-xl p-4 gap-1">
                            {/* Placeholder content for recipe */}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-black">
            <div className="flex ml-32 gap-3 flex-wrap">
            {recipes.map((recipe, index) => (
                    <div key={index} className="flex mt-10 flex-col bg-neutral-300 ml-4 w-96 h-auto rounded-xl p-4 gap-1">
                        <div className="bg-neutral-400/50 w-full h-32 rounded-md overflow-hidden">
                            <img className="object-cover w-full h-full" src={test} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-lg font-bold font-serif">{recipe.title}</div>
                            <div className="font-serif">{recipe.ingredients}</div>
                            <div className="w-full h-4 rounded-md">{recipe.cooking_time}</div>
                            <div className="w-2/4 h-4 rounded-md">{recipe.nutrition_information}</div>
                            <div>{recipe.description}</div>
                        </div>
                        <div className="flex w-64 gap-2 p-4">
                            <div className="h-12 w-12 rounded-full bg-neutral-400/50 overflow-hidden">
                                <img className="object-cover w-full h-full" src={test} alt="" />
                            </div>
                            <div className="flex-1">
                                <div className="mb-1 h-5 w-3/5 rounded-lg text-lg font-serif">Abderrahmane</div>
                                <div className="h-5 w-[90%] rounded-lg text-sm font-serif">my bio is here </div>
                            </div>
                            <div className=" bottom-5 right-0 h-4 w-4 rounded-full">
                                <svg
                                    className="ml-4 w-6 h-6 text-gray-800 dark:text-blue-600"
                                    aria-hidden="true"
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
                        <div className='flex'>
                        {favorites.some((favorite) => favorite.recipe_id === recipe.id) ? (
                                // If the recipe is a favorite, render the red heart icon
                                <svg
                                    className='mt-2 ml-3 cursor-pointer'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 28 20"
                                    fill="red"
                                    stroke='none'
                                    onClick={() => {
                                        const favId = favorites.find((favorite) => favorite.recipe_id === recipe.id).id;
                                        unheart(favId);
                                    }}
                                    style={{ transition: "fill 0.5s, stroke 0.5s" }}
                                >
                                    <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                                </svg>
                            ) : (
                                // If the recipe is not a favorite, render the gray heart icon
                                <svg
                                    className='mt-2 ml-3 cursor-pointer'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36" 
                                    viewBox="0 0 28 20"
                                    fill="none"
                                    stroke="gray"
                                    onClick={() => {
                                        handleFavoriteToggle(recipe.id);  // Call the favorite toggle function
                                    }}
                                    style={{ transition: "fill 0.5s, stroke 0.5s" }}
                                >
                                    <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                                </svg>
                            )}
                            <p className='mt-2'>{recipe.likes}</p>
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
