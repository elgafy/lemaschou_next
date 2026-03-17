import CurrencySymbol from "@/components/ui/currencySymbol";
import { useEffect, useState } from "react";

const ReservationSummaryWidget = (props: { title: string, value: string, subtitle: string, icon?: React.ReactNode }) => {
    const { title, value, subtitle, icon } = props;
    return (
        <div className="bg-white px-2 py-4 rounded-lg shadow-md flex-1 flex flex-col justify-center items-center text-center">
            {icon && <div className="pb-2" color="#381112">{icon}</div>}
            <h3 className="text-sm font-semibold whitespace-nowrap">{title}</h3>
            <p className="text-sm whitespace-nowrap">{value}</p>
            <p>{subtitle}</p>
        </div>
    );
};


const PaymentItem = (props: { title: string, value: number }) => {
    const { title, value } = props;
    return (
        <div className="w-full flex justify-between text-base sm:text-sm border-b-2 border-gray-300 pt-4 pb-2 text-left rtl:text-right">
            <p className="">{title}</p>
            <p className="flex items-center gap-2"><CurrencySymbol /> {value}</p>
        </div>
    );
}

// Display booking success or failure message
const ReservationSuccessWidget = (props: { title: string, reservation: any }) => {
    const { title, reservation } = props;
    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 bg-white theme-border rounded-lg shadow-md flex-1">
            <h4 className="text-3xl text-center font-Rufina font-semibold">{title}</h4>
            <div className="flex justify-start w-full sm:flex-col">
                <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Reservation for: </p>
                <p className="text-base sm:text-base">{`${reservation?.first_name} ${reservation.last_name}`}</p>
            </div>
            <div className="flex justify-start w-full sm:flex-col">
                <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Reservation Reference: </p>
                <p className="text-base sm:text-base">{reservation?.sevenrooms_reservation_id}</p>
            </div>
            <div className="flex justify-start w-full sm:flex-col">
                <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Reservation Date: </p>
                <p className="text-base sm:text-base">{reservation?.date}</p>
            </div>
            <div className="flex justify-start w-full sm:flex-col">
                <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Reservation Time: </p>
                <p className="text-base sm:text-base">{reservation?.time}</p>
            </div>
            <div className="flex justify-start w-full sm:flex-col">
                <p className="font-semibold text-base sm:text-base w-[30%] sm:w-full">Guests: </p>
                <p className="text-base sm:text-base">{reservation?.guests_count}</p>
            </div>
        </div>
    );
}

// Display booking success or failure message
const ReservationTimer = (props: {title: string, time: number, showTimer: boolean, onTimeOut: any }) => {
    const { title, time, showTimer, onTimeOut } = props;
    const [remainingTime, setRemainingTime] = useState(time);
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 0) {
                    onTimeOut();
                    setRemainingTime(0);
                    clearInterval(interval);
                }
                return prevTime - 1000
            });
            if(!showTimer) {
                clearInterval(interval);
                setRemainingTime(time);
            }
        }, 1000);
        console.log(remainingTime);
        return () => clearInterval(interval);
    }, [showTimer]);
    
    if (showTimer) return (
        <>
         <div className="w-full flex flex-col gap-1 mb-4 animated zoomIn">
            <h4 className="text-sm text-center mt-4 mb-1">{title}</h4>
            <h4 className="text-4xl text-center ltr mb-4" style={{direction: 'ltr'}}>{Math.floor(remainingTime / 60000).toString().padStart(2, '0')} : {Math.floor((remainingTime % 60000) / 1000).toString().padStart(2, '0')}</h4>
            </div>
        </>
    );
}

export { ReservationSummaryWidget, PaymentItem, ReservationSuccessWidget, ReservationTimer };