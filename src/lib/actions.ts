"use server";

import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";

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
    // console.log("Converted Date: " + riyadhDate);
    return riyadhDate;
}

export async function checkAvailability(date: Date, guests: number = 2) {
    // console.log(date);
    const url = process.env.BASE_URL +'reservations/check-availability/' + convertDate(date) + '/' + guests + '/';
    // console.log(url);
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
    // console.log("JSON data: " + JSON.stringify(formData));
    // Validating form data before sending
    const schema = z.object({
        date: z.date() || z.undefined(),
        time: z.string(),
        guests: z.coerce.number<number>().min(2).max(12),
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        mobile: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
        emailAddress: z.email({ message: "Invalid email address" }),
        specialRequest: z.string().max(255, {
            message: "Request is too long, please reduce message"
        }),
        occasion: z.boolean(),
        occasionType: z.string(),
        occasionSelectedItems: z.array(z.string()),
        occasionItemsPrice: z.number(),
        cardContent: z.string().max(255, {
            message: "Card content is too long, please reduce message"
        }),
        allergic: z.boolean(),
        allergies: z.array(z.string()),
        paymentPolicyAccepted: z.boolean(),
        termsAccepted: z.boolean(),
        deposite: z.uint32(),
    })

    try {
        const parsedData = schema.parse(formData);
        console.log("Parsed Data: " + JSON.stringify(parsedData));
        formData.date = convertDate(formData.date);
        const urlencodedData = new URLSearchParams(formData);
        try {
            const response = await fetch(process.env.BASE_URL +'reservations/book/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                body: urlencodedData,
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            }
            if (!response.ok) {
                // throw new Error(`HTTP error! status: ${response.status}`);
                const res = await response.json();
                console.log("Make reservation error response:");
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
    } catch (error) {
        if (error instanceof z.ZodError) {
            const data = {
                success: false,
                message: 'Validation error',
                errors: z.treeifyError(error),
            }
            return data;
        } else {
            return { success: false, message: 'An error occurred' };
        }
    }
}