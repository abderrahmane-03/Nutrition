import { useState } from 'react';
import loading from '../assets/loading.gif';

export default function Login() {
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);

    const handlePayNowClick = () => {
        // Show loading spinner
        setLoadingVisible(true);

        // After 3 seconds, hide loading spinner and show success message
        setTimeout(() => {
            setLoadingVisible(false);
            setSuccessVisible(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSuccessVisible(false);
            }, 2000);
        }, 2000);
    };

    return (
        <>

<div className="min-w-screen min-h-screen  bg-gradient-to-b from-green-400 to-black py-5">
   
    <div className="w-full bg-white mt-20 border-t border-b border-gray-200 px-5 py-10 text-gray-800">
        <div className="w-full">
            <div className="-mx-3 md:flex items-start">
                <div className="px-3 md:w-7/12 lg:pr-10">
                    <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                        <div className="w-full flex items-center">
                            <div className="overflow-hidden rounded-lg w-16 h-16 bg-green-50 border border-gray-200">
                            <img src="" className='w-32 ml-24 h-24 p-3' alt="yy"/>
                
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-semibold uppercase text-gray-600">Coach hamouda.</h6>
                                <p className="text-gray-400">x 1</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600 text-xl">2100</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 pb-6 border-b border-gray-200">
                        <div className="-mx-2 flex items-end justify-end">
                            <div className="flex-grow px-2 lg:max-w-xs">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Discount code</label>
                                <div>
                                    <input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 transition-colors" placeholder="XXXXXX" type="text"/>
                                </div>
                            </div>
                            <div className="px-2">
                                <button className="block w-full max-w-xs mx-auto border border-transparent bg-green-400 hover:bg-green-500 focus:bg-green-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                        <div className="w-full flex mb-3 items-center">
                            <div className="flex-grow">
                                <span className="text-gray-600">Subtotal</span>
                            </div>
                            <div className="pl-3">
                                <span className="font-semibold">1900.91</span>
                            </div>
                        </div>
                        <div className="w-full flex items-center">
                            <div className="flex-grow">
                                <span className="text-gray-600">Taxes (GST)</span>
                            </div>
                            <div className="pl-3">
                                <span className="font-semibold">190.09</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                        <div className="w-full flex items-center">
                            <div className="flex-grow">
                                <span className="text-gray-600">Total</span>
                            </div>
                            <div className="pl-3">
                                <span className="font-semibold text-gray-400 text-sm">MAD</span> <span className="font-semibold">2100.00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-3 md:w-5/12">
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-3 items-center">
                            <div className="w-32">
                                <span className="text-gray-600 font-semibold">Contact</span>
                            </div>
                            <div className="flex-grow pl-3">
                                <span>Scott Windon</span>
                            </div>
                        </div>
                        <div className="w-full flex items-center">
                            <div className="w-32">
                                <span className="text-gray-600 font-semibold">Billing Address</span>
                            </div>
                            <div className="flex-grow pl-3">
                                <span>123 George Street, Sydney, NSW 2000 Australia</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                        <div className="w-full p-3 border-b border-gray-200">
                            
                            <div>
                                <div className="mb-3">
                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                                    <div>
                                        <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 transition-colors" placeholder="John Smith" type="text"/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                                    <div>
                                        <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 transition-colors" placeholder="0000 0000 0000 0000" type="text"/>
                                    </div>
                                </div>
                                <div className="mb-3 -mx-2 flex items-end">
                                    <div className="px-2 w-1/4">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Expiration date</label>
                                        <div>
                                            <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 transition-colors cursor-pointer">
                                                <option value="01">01 - January</option>
                                                <option value="02">02 - February</option>
                                                <option value="03">03 - March</option>
                                                <option value="04">04 - April</option>
                                                <option value="05">05 - May</option>
                                                <option value="06">06 - June</option>
                                                <option value="07">07 - July</option>
                                                <option value="08">08 - August</option>
                                                <option value="09">09 - September</option>
                                                <option value="10">10 - October</option>
                                                <option value="11">11 - November</option>
                                                <option value="12">12 - December</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="px-2 w-1/4">
                                        <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 transition-colors cursor-pointer">
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                        </select>
                                    </div>
                                    <div className="px-2 w-1/4">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Security code</label>
                                        <div>
                                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 transition-colors" placeholder="000" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <button onClick={handlePayNowClick} className="block w-full max-w-xs mx-auto bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-2 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                    </div>
                </div>
                
                {loadingVisible &&<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <img src={loading} alt="loading" className="fixed inset-0 m-auto w-52" />
                        
                    </div> }

                
                {successVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg text-center">
                            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-10.707a1 1 0 00-1.414-1.414L10 10.586l-1.879-1.879a1 1 0 10-1.414 1.414l2.5 2.5a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                            </svg>
                            <p className="text-green-500 font-semibold">Payment Successful</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    </div>
        </>
    );
}