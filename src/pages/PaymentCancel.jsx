
import { Link } from 'react-router-dom';
import notBicep from '../assets/notBicep.png';

function PaymentSuccess() {

  return (
<div className="bg-gradient-to-b from-red-600 to-black h-[40rem]">
      <div className="bg-white p-6 absolute  rounded-lg top-44 left-1/3 ml-28">
        {/* <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg> */}
        <img src={notBicep} className='w-64 ml-8' alt="" />
        <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment canceled!</h3>
           
            <p> Shoose wisely!  </p>
            <div className="py-10 text-center">
                <Link to="/coaches" className="px-12 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
                    GO BACK 
               </Link>
            </div>
        </div>
    </div>
  </div>
  );
}

export default PaymentSuccess;