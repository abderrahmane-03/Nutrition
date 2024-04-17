import { useState, useEffect } from 'react';
import test from '../assets/test.jpg';
import loading from '../assets/loading.gif';
async function fetchData() {
    // Simulating fetching data from an API
    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 2 seconds
}

export default function Recipes() {
    const [clickedItems, setClickedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataAndSetLoading = async () => {
            await fetchData();
            setIsLoading(false);
        };

        fetchDataAndSetLoading();
    }, []);

    const handleClick = (index) => {
        if (clickedItems.includes(index)) {
            // If the item is already clicked, remove it
            setClickedItems(clickedItems.filter(item => item !== index));
        } else {
            // If the item is not clicked, add it
            setClickedItems([...clickedItems, index]);
        }
    };
    if (isLoading) {
        return (
            
            <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex justify-center items-center">
           
             {/* Display the loading GIF centered and auto-looped */}
            <img src={loading} alt="loading" className="fixed right-0 w-40 " />
        <div className="flex ml-32 gap-3 flex-wrap">
                {[...Array(10)].map((_, index) => (
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
        <>
            {/* Render your recipes UI here */}
           
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-black "> 
        <div className="flex ml-32  gap-3 flex-wrap">
                <div className="flex mt-10 flex-col bg-neutral-300 ml-4 w-96 h-auto rounded-xl p-4 gap-1">
                    <div className="bg-neutral-400/50 w-full h-32 rounded-md overflow-hidden">
                        <img className="object-cover w-full h-full" src={test} alt="" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-lg font-bold font-serif">The big title</div> 
                        <div className="font-serif">5 engriedents</div>
                        <div className=" w-full h-4 rounded-md">COOCKING</div>
                        <div className=" w-2/4 h-4 rounded-md">INFO</div>description is here steps description is here  description is here stepsdescription is here steps stepsdescription is here steps
                    </div>
                    <div className="flex w-64 gap-2 p-4">
                        <div className="h-12 w-12 rounded-full bg-neutral-400/50 overflow-hidden"><img className="object-cover w-full h-full" src={test} alt="" /></div>
                        <div className="flex-1">
                            <div className="mb-1 h-5 w-3/5 rounded-lg text-lg font-serif">Abderrahmane</div>
                            <div className="h-5 w-[90%] rounded-lg text-sm font-serif">my bio is here </div>
                        </div>
                        <div className=" bottom-5 right-0 h-4 w-4 rounded-full"><svg
                                            className="ml-4 w-6 h-6 text-gray-800 dark:text-blue-600" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd"
                                                d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
                                                 />
                                        </svg></div>
                    </div>
                    <div className='flex'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            viewBox="0 0 28 20"
                            fill={clickedItems.includes(0) ? "red" : "none"}
                            stroke={clickedItems.includes(0) ? "red" : "white"}
                            onClick={() => handleClick(0)}
                            style={{ transition: "fill 0.5s, stroke 0.5s" }}
                        >
                            <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                        </svg><p className='mt-2'>23</p>
                        <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 28 20" fill="none" stroke="white"><path d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172 2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828.653.654 1.528.943 2.828 1.07" /><path d="M12 11v.01" /><path d="M8 11v.01" /><path d="M16 11v.01" /><path d="M14 19c-1.236 0-2.598.5-3.841 1.145-1.998 1.037-2.997 1.556-3.489 1.225-.492-.33-.399-1.355-.212-3.404L6.5 17.5" /></svg>
                        <p className='mt-2'>23</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}