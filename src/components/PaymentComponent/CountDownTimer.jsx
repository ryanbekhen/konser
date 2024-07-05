import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'
import { base_url } from '../../utils/const';
import { toast } from 'react-toastify';

const CountdownTimer = ({targetTime}) => {
    
    const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());
    const navigate = useNavigate()

    useEffect(() => {
        const updateCountdown = () => {
            const now = Date.now();
            const difference = targetTime - now;

            if (difference <= 0) {
                setTimeLeft(0);
                clearInterval(intervalId);
                return;
            }

            setTimeLeft(difference);
        };

        const intervalId = setInterval(updateCountdown, 1000);

        updateCountdown(); // Initial call to display the countdown immediately

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [targetTime]);

    useEffect(()=>{
        if (timeLeft <=0) {
            // REDIRECT IF PAYMENT ALREADY EXPIRED
            // alert('TRANSACTION ALREADY EXPIRED')
            
            toast.warn("TRANSACTION ALREADY EXPIRED", {
                position: "top-center",
                theme: "colored",
            });
            // console.log("base_url>>>", base_url);
            navigate(`${base_url}/`)
        }
    },[timeLeft])
    
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div className='font-bold text-[15px] text-[#F57985] tracking-wider' id="countdown">
            {timeLeft <= 0 ? "Your Payment Already Expired" : `${minutes}m ${seconds}s`}
        </div>
    );
};

export default CountdownTimer;
