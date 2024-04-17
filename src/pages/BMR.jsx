import { useState } from 'react';

export default function BMRCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(20);
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(80);
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [weightGoal, setWeightGoal] = useState('maintain');
  const [bmrResult, setBmrResult] = useState(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary (little to no exercise)', multiplier: 1.2 },
    lightlyActive: { label: 'Lightly active (light exercise/sports 1-3 days a week)', multiplier: 1.375 },
    moderatelyActive: { label: 'Moderately active (moderate exercise/sports 3-5 days a week)', multiplier: 1.55 },
    veryActive: { label: 'Very active (hard exercise/sports 6-7 days a week)', multiplier: 1.725 },
    extraActive: { label: 'Extra active (very hard exercise/sports & physical job or 2x training)', multiplier: 1.9 },
  };

  const calculateBMR = () => {
    let bmr;
    if (gender === 'male') {
      bmr = 66.5 + 13.75 * weight + 5.003 * height - 6.755 * age;
    } else {
      bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }
    const activityMultiplier = activityLevels[activityLevel].multiplier;
    const maintenanceCalories = bmr * activityMultiplier;

    let caloriesGoal;
    switch (weightGoal) {
      case 'lose':
        caloriesGoal = maintenanceCalories - 500; // Aim to lose 0.5 kg per week
        break;
      case 'gain':
        caloriesGoal = maintenanceCalories + 500; // Aim to gain 0.5 kg per week
        break;
      default:
        caloriesGoal = maintenanceCalories;
    }

    setBmrResult(caloriesGoal.toFixed(0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-black flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">BMR Calculator</h2>
        <form className="mb-6">
          {/* Gender selection */}
          <div className="flex flex-col items-center gap-4 overflow-hidden rounded-md p-6">
          <span className="text-center font-mono text-base font-black uppercase text-neutral-600">Please select your gender</span>
          <div className="flex items-center gap-4">
            <div className="relative flex h-[50px] w-[50px] items-center justify-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="peer z-10 h-full w-full cursor-pointer opacity-0"
              />
              <div className="absolute h-full w-full rounded-full bg-blue-100 p-4 shadow-sm shadow-[#00000050] ring-blue-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
              <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-blue-200 duration-500 peer-checked:scale-[500%]"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none" className="absolute stroke-blue-400">
              <path
                                               d="M15.5631 16.1199C14.871 16.81 13.9885 17.2774 13.0288 17.462C12.0617 17.6492 11.0607 17.5459 10.1523 17.165C8.29113 16.3858 7.07347 14.5723 7.05656 12.5547C7.04683 11.0715 7.70821 9.66348 8.8559 8.72397C10.0036 7.78445 11.5145 7.4142 12.9666 7.71668C13.9237 7.9338 14.7953 8.42902 15.4718 9.14008C16.4206 10.0503 16.9696 11.2996 16.9985 12.6141C17.008 13.9276 16.491 15.1903 15.5631 16.1199Z"
                                                ></path>
                                            <path
                                                d="M14.9415 8.60977C14.6486 8.90266 14.6486 9.37754 14.9415 9.67043C15.2344 9.96332 15.7093 9.96332 16.0022 9.67043L14.9415 8.60977ZM18.9635 6.70907C19.2564 6.41617 19.2564 5.9413 18.9635 5.64841C18.6706 5.35551 18.1958 5.35551 17.9029 5.64841L18.9635 6.70907ZM16.0944 5.41461C15.6802 5.41211 15.3424 5.74586 15.3399 6.16007C15.3374 6.57428 15.6711 6.91208 16.0853 6.91458L16.0944 5.41461ZM18.4287 6.92872C18.8429 6.93122 19.1807 6.59747 19.1832 6.18326C19.1857 5.76906 18.8519 5.43125 18.4377 5.42875L18.4287 6.92872ZM19.1832 6.17421C19.1807 5.76001 18.8429 5.42625 18.4287 5.42875C18.0145 5.43125 17.6807 5.76906 17.6832 6.18326L19.1832 6.17421ZM17.6973 8.52662C17.6998 8.94082 18.0377 9.27458 18.4519 9.27208C18.8661 9.26958 19.1998 8.93177 19.1973 8.51756L17.6973 8.52662ZM16.0022 9.67043L18.9635 6.70907L17.9029 5.64841L14.9415 8.60977L16.0022 9.67043ZM16.0853 6.91458L18.4287 6.92872L18.4377 5.42875L16.0944 5.41461L16.0853 6.91458ZM17.6832 6.18326L17.6973 8.52662L19.1973 8.51756L19.1832 6.17421L17.6832 6.18326Z"
                                            ></path>
              </svg>
            </div>
            <div className="relative flex h-[50px] w-[50px] items-center justify-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="peer z-10 h-full w-full cursor-pointer opacity-0"
              />
              <div className="absolute h-full w-full rounded-full bg-pink-100 p-2 shadow-sm shadow-[#00000050] ring-pink-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
              <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-pink-200 duration-500 peer-checked:scale-[500%]"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none" className="absolute fill-pink-400">
              <path
                                              d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
                                            ></path>
              </svg>
            </div>
          </div>
        </div>
          {/* Age input */}
         <div className="relative w-full">
            <input type="number" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border dark:bg-green-700 dark:border-s-green-700  dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:border-blue-500" placeholder={age} value={age} required />
        </div>
          <div className="relative">
          <label htmlFor="AGE-range-input" className="sr-only">Age range</label>
          <input
            id="AGE-range-input"
            type="range"
            value={age}
            min="1"
            max="100"
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer dark:bg-green-700"
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (1)</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">25</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">50</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">75</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (100)</span>
        </div>
          {/* Height input */}
          <div className="mb-4 mt-8">
            <label htmlFor="height" className="block text-gray-700 text-sm font-bold mb-2">Height (in cm):</label>
          </div>
          <div className="relative w-full">
            <input type="number" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border dark:bg-green-700 dark:border-s-green-700  dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:border-blue-500" placeholder={height} value={height} required />
        </div>
          <div className="relative">
          <label htmlFor="AGE-range-input" className="sr-only"></label>
          <input
          
            id="height"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            type="range"
            min="1"
            max="300"
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer dark:bg-green-700"
           
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (1)</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">75</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">150</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">230</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (300)</span>
        </div>
          {/* Weight input */}
          <div className="mb-4 mt-8">
            <label htmlFor="weight" className="block text-gray-700 text-sm font-bold mb-2">Weight (in kg):</label>
            </div>
          <div className="relative w-full">
            <input type="number" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border dark:bg-green-700 dark:border-s-green-700  dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:border-blue-500" placeholder={weight} value={weight} required />
        </div>
          <div className="relative">
          <label htmlFor="AGE-range-input" className="sr-only"></label>
          <input
          
            id="weight"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            type="range"
            min="1"
            max="300"
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer dark:bg-green-700"
           
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (1)</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">75</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">150</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">230</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (300)</span>
        </div>
          {/* Activity Level selection */}
          <div className="mb-4 mt-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">Activity Level:</label>
            <select
              className="form-select w-full text-gray-800"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              {Object.keys(activityLevels).map((key) => (
                <option key={key} value={key}>{activityLevels[key].label}</option>
              ))}
            </select>
          </div>
          {/* Weight Goal selection */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Weight Goal:</label>
            <select
              className="form-select w-full text-gray-800"
              value={weightGoal}
              onChange={(e) => setWeightGoal(e.target.value)}
            >
              <option value="maintain">Maintain Weight</option>
              <option value="lose">Lose 0.5 kg per week</option>
              <option value="gain">Gain 0.5 kg per week</option>
            </select>
          </div>
        </form>
        {/* Calculate button */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={calculateBMR}
        >
          Calculate BMR
        </button>
        {/* BMR result */}
        {bmrResult && (
          <p className="mt-6 text-center text-xl text-gray-800">
            Your daily calorie goal is approximately {bmrResult} calories.
          </p>
        )}
      </div>
    </div>
  );
}
