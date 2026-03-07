import CurrencySymbol from "@/components/ui/currencySymbol";
import React from "react";

const ReservationSummaryWidget = (props: { title: string, value: string, subtitle: string, icon?: React.ReactNode }) => {
    const { title, value, subtitle, icon } = props;
    return (
        <div className="bg-white px-2 py-4 rounded-lg shadow-md flex-1 flex flex-col justify-center items-center text-center">
            {icon && <div className="pb-2" color="#381112">{icon}</div>}
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-sm">{value}</p>
            <p>{subtitle}</p>
        </div>
    );
};


const PaymentItem = (props: { title: string, value: number }) => {
    const { title, value } = props;
    return (
        <div className="w-full flex justify-between text-base sm:text-sm border-b-2 border-gray-300 pt-4 pb-2 text-left rtl:text-right">
            <p className="">{title}</p>
            <p className="flex items-center gap-2">{value} <CurrencySymbol /></p>
        </div>
    );
}

// Display booking success or failure message
const ReservationBookingWidget = (props: { title: string, reservation: any }) => {
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
                <p className="text-base sm:text-base">{reservation?.id}</p>
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

export { ReservationSummaryWidget, PaymentItem, ReservationBookingWidget };