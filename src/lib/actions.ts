"use server";

export async function getReservationSettings(day: number = 0) {
    try {
        // const response = await fetch('http://localhost:8000/api/reservations/venues');
        const response = await fetch(process.env.BASE_URL + 'reservations/settings/' + day);
        const data = await response.json();
        return data.data;
    } catch (err){
        console.log(err);
    }
}

const convertDate = function(date: Date): string {
    // date.setHours(date.getHours() + 3);
    const riyadhDate = date.toLocaleString('sv-SE', {
    timeZone: 'Asia/Riyadh',
    dateStyle: 'short',
    });
    console.log("Converted Date: " + riyadhDate);
    const dateFormatted = date.toISOString().slice(0, 10);
    console.log("Formatted Date: " + dateFormatted);
    return riyadhDate;
    // return riyadhDate.replace(/\//g, '-');
}

export async function checkAvailability(date: Date, guests: number = 2) {
    console.log(date);
    const url = process.env.BASE_URL +'reservations/check-availability/' + convertDate(date) + '/' + guests + '/';
    console.log(url);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (response.ok) {
            const res = await response.json();
            console.log(res);
            const data = {
                success: true,
                data: res.data,
                message: 'Checked availability successfully',
                specialDay: res.special_day,
            }
            return data;
        }
        if (!response.ok) {
            const res = await response.json();
            console.log(res);
            const data = {
                success: false,
                message: 'Failed to check availability',
                data: null,
                specialDay: false,
            }
            return data;
        }
    } catch (err){
        console.log(err);
        const data = {
            success: false,
            message: 'Failed to check availability',
            data: null,
            specialDay: false,
        }
        return data;
    }
    
}

export async function makeReservation(formData: any) {
    // console.log("Raw date: " + formData.date);
    console.log("JSON data: " + JSON.stringify(formData));
    formData.date = convertDate(formData.date);
    // console.log("Converted date: " + formData.date);
    const urlencodedData = new URLSearchParams(formData);
    // console.log("URL encoded data" + urlencodedData);
    try {
        const response = await fetch(process.env.BASE_URL +'reservations/book/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: urlencodedData,
        });
        // console.log( await response.json());
        if (response.ok) {
            const data = await response.json();
            // const reservationData = {
            //     success: true,
            //     id: data.data.reservation.id,
            //     reference: data.data.reservation.reference,
            //     name: data.data.reservation.first_name + ' ' + data.data.reservation.last_name,
            //     date: data.data.reservation.date,
            //     time: data.data.reservation.time,
            //     guests: data.data.reservation.guests,
            //     message: data.message,

            // }
            console.log(data);
            return data;
        }
        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            const res = await response.json();
            console.log(res);
            const data = {
                success: false,
                message: 'Failed to make reservation'
            }
            return data;
        }
    } catch (err){
        console.log(err);
        return err;
    }
}