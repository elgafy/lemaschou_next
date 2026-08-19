"use client";
import { useDebounce } from "use-debounce";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, UsersRoundIcon, CalendarDaysIcon, ClockIcon, ArmchairIcon, GemIcon, Plus, Minus } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { checkAvailability, makeReservation } from "@/lib/actions";
import Image from "next/image";
import CurrencySymbol from "@/components/ui/currencySymbol";
import DownPaymentSymbol from "@/components/ui/downPaymentSymbol";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import Link from "next/link";
import { PaymentItem, ReservationSuccessWidget, ReservationSummaryWidget, ReservationTimer } from "./ReservationWidgetComponents";
import CelebrationSymbol from "@/components/ui/celebrationSymbol";

export default function ReservationWidget(props: { settings: any }) {
    const { settings } = props;
    const locale = useLocale();

    const bookingWindow = settings.settings.booking_time_window ? settings.settings.booking_time_window * 60000 : 300000; // 5 minutes in milliseconds
    const addVat = settings.settings.add_calculated_vat; // 5 minutes in milliseconds
    const t = useTranslations("reservationPage");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<Boolean>(true);
    const [showReservationNotice, setShowReservationNotice] = useState<Boolean | null>(null);
    const [showSummary, setShowSummary] = useState<Boolean>(false);
    const [showTimer, setShowTimer] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [cardEnabled, setCardEnabled] = useState<Boolean>(false);
    const [seatingTime, setSeatingTime] = useState('0');
    const [availability, setAvailability] = useState([]);
    const [specialDay, setSpecialDay] = useState(null);
    const [price, setPrice] = useState(0);
    const [vat, setVat] = useState(0);
    const [reservationSuccess, setReservationSuccess] = useState<Boolean>(false);
    const [reservation, setReservation] = useState<any | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [downPayment, setDownPayment] = useState<number>(0);
    const [orderItems, setOrderItems] = useState<Array<{ title: string, value: number }>>([]);
    const [selectedOccasionItems, setSelectedOccasionItems] = useState<Array<{
        uniqueKey: string;
        itemId: number;
        itemNameEn: string;
        itemNameAr: string;
        hasVariations: boolean;
        variationNameEn?: string;
        variationNameAr?: string;
        variationValueEn?: string;
        variationValueAr?: string;
        unitPrice: number;
        count: number;
    }>>([]);
    const [selectedVariationOptions, setSelectedVariationOptions] = useState<Record<number, string>>({});
    const occasions: Array<string> = Object.values(settings.occasions) ?? [];
    const allergies: Array<string> = Object.values(settings.foodAllergies) ?? [];
    const occasionItems: Array<any> = Object.values(settings.occasionItems) ?? [];
    const giftCards: Array<any> = settings?.giftCards ?? [];

    const handleAddVariation = (item: any, variationGroup: any, valObj: any) => {
        const unitPrice = (valObj.price !== null && valObj.price !== undefined && valObj.price !== "")
            ? parseFloat(valObj.price)
            : (item.price != null ? parseFloat(item.price) : 0);
        const uniqueKey = `${item.id}-${valObj.value_en}`;

        setSelectedOccasionItems(prev => {
            const existingIndex = prev.findIndex(i => i.uniqueKey === uniqueKey);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    count: updated[existingIndex].count + 1
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        uniqueKey,
                        itemId: item.id,
                        itemNameEn: item.name_en,
                        itemNameAr: item.name_ar,
                        hasVariations: true,
                        variationNameEn: variationGroup?.name_en,
                        variationNameAr: variationGroup?.name_ar,
                        variationValueEn: valObj.value_en,
                        variationValueAr: valObj.value_ar,
                        unitPrice,
                        count: 1
                    }
                ];
            }
        });
    };

    const handleAddNonVariation = (item: any) => {
        const unitPrice = item.price != null ? parseFloat(item.price) : 0;
        const uniqueKey = `${item.id}-default`;

        setSelectedOccasionItems(prev => {
            const existingIndex = prev.findIndex(i => i.uniqueKey === uniqueKey);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    count: updated[existingIndex].count + 1
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        uniqueKey,
                        itemId: item.id,
                        itemNameEn: item.name_en,
                        itemNameAr: item.name_ar,
                        hasVariations: false,
                        unitPrice,
                        count: 1
                    }
                ];
            }
        });
    };

    const handleIncrement = (uniqueKey: string) => {
        setSelectedOccasionItems(prev =>
            prev.map(i => i.uniqueKey === uniqueKey ? { ...i, count: i.count + 1 } : i)
        );
    };

    const handleDecrement = (uniqueKey: string) => {
        setSelectedOccasionItems(prev => {
            const item = prev.find(i => i.uniqueKey === uniqueKey);
            if (!item) return prev;
            if (item.count > 1) {
                return prev.map(i => i.uniqueKey === uniqueKey ? { ...i, count: i.count - 1 } : i);
            } else {
                return prev.filter(i => i.uniqueKey !== uniqueKey);
            }
        });
    };

    console.log("occasionItems:", occasionItems);
    console.log("allergies:", allergies);

    // Availability check function
    const check = async function (date: Date, guests?: number) {
        if (reservationSuccess == true) return;
        setLoading(true);
        const availability = await checkAvailability(date, guests);
        if (availability?.success == true) {
            setAvailability(availability?.data);
            setSpecialDay(availability?.specialDay);
            setLoading(false);
        } else {
            setAvailability([]);
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     document.addEventListener("visibilitychange", function() {
    //         if (document.visibilityState === 'visible') {
    //             // console.log("Window is visible");
    //             const bookingStartTime = localStorage.getItem("bookingStartTime");
    //             if (bookingStartTime) {
    //                 const currentTime = Date.now();
    //                 const elapsedTime = currentTime - parseInt(bookingStartTime);
    //                 setRemainingTime(bookingWindow - elapsedTime);
    //             }
    //         } else {
    //             // console.log("Window is not visible");
    //         }
    //     });
    // }, []);

    // Form schema and setup
    const formSchema = z.object({
        date: z.date(),
        time: z.string(),
        guests: z.coerce.number<number>().min(2).max(12),
        firstName: z.string().min(1, { message: t('emptyFieldError') }),
        lastName: z.string().min(1, { message: t('emptyFieldError') }),
        mobile: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
        emailAddress: z.email({ message: t('invalidEmail') }),
        specialRequest: z.string().max(255, {
            message: "Request is too long, please reduce message"
        }),
        occasion: z.boolean(),
        occasionType: z.string(),
        occasionSelectedItems: z.array(z.any()),
        occasionItemsPrice: z.number(),
        cardContent: z.string().max(255, {
            message: t('cardContentPattern')
        }),
        allergic: z.boolean(),
        allergies: z.array(z.string()),
        paymentPolicyAccepted: z.boolean(),
        termsAccepted: z.boolean(),
        deposite: z.uint32(),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // mode: "onSubmit",
        defaultValues: {
            date: new Date(),
            time: "",
            guests: 2,
            firstName: "",
            lastName: "",
            mobile: "",
            emailAddress: "",
            specialRequest: "",
            occasion: false,
            occasionType: "",
            occasionSelectedItems: [],
            occasionItemsPrice: 0,
            cardContent: "",
            allergic: false,
            allergies: [],
            paymentPolicyAccepted: false,
            termsAccepted: false,
            deposite: 0
        }
    })

    // Form watchers
    const occasion = form.watch("occasion");
    const occasionSelectedItems = form.watch("occasionSelectedItems");
    const allergic = form.watch("allergic");
    const date = form.watch("date");
    const guests = form.watch("guests");
    const time = form.watch("time");
    const termsAccepted = form.getValues("termsAccepted");
    const paymentPolicyAccepted = form.getValues("paymentPolicyAccepted");


    // Define refs to scroll behavior
    const bookingNotice = useRef<HTMLDivElement>(null);
    const bookingForm = useRef<HTMLDivElement>(null);
    const bookingSuccess = useRef<HTMLDivElement>(null);

    const [debouncedDate] = useDebounce(date, 300);
    const [debouncedGuests] = useDebounce(guests, 800);
    useEffect(() => {
        check(debouncedDate, debouncedGuests);
    }, [debouncedDate, debouncedGuests]);

    // Clear selected occasion items when occasion toggle is turned off
    useEffect(() => {
        if (!occasion) {
            setSelectedOccasionItems([]);
            setCardEnabled(false);
        }
    }, [occasion]);

    // Calculate total price of selected occasion items
    useEffect(() => {
        let itemsPrice = 0;
        const summaryList: Array<{ title: string; value: number }> = [];

        selectedOccasionItems.forEach((sel) => {
            const lineTotal = sel.unitPrice * sel.count;
            itemsPrice += lineTotal;
            const itemName = locale === 'ar' ? (sel.itemNameAr || sel.itemNameEn) : (sel.itemNameEn || sel.itemNameAr);
            let title = itemName;
            if (sel.hasVariations && (sel.variationValueEn || sel.variationValueAr)) {
                const varVal = locale === 'ar' ? (sel.variationValueAr || sel.variationValueEn) : (sel.variationValueEn || sel.variationValueAr);
                title = `${itemName} (${varVal})`;
            }
            if (sel.count > 1) {
                title = `${title} × ${sel.count}`;
            }
            summaryList.push({
                title,
                value: lineTotal
            });
        });

        setOrderItems(summaryList);
        setPrice(itemsPrice);

        // Update form value & VAT
        const clacVat = (itemsPrice * (settings.settings?.vat_value || 0)) / 100;
        if (addVat) {
            setVat(clacVat);
            setPrice(itemsPrice);
            const itemsTotalPrice = downPayment > 0 ? itemsPrice + clacVat + downPayment : itemsPrice + clacVat;
            setTotalPrice(itemsTotalPrice);
            form.setValue("occasionItemsPrice", itemsTotalPrice);
        } else {
            const itemsTotalPrice = downPayment > 0 ? itemsPrice + downPayment : itemsPrice;
            setTotalPrice(itemsTotalPrice);
            form.setValue("occasionItemsPrice", itemsPrice);
        }

        form.setValue("occasionSelectedItems", selectedOccasionItems.map(i => i.uniqueKey));
    }, [selectedOccasionItems, downPayment, locale]);

    // Time selection effect
    useEffect(() => {
        if (!time) {
            setShowSummary(false);
            setShowTimer(false);
            return
        };
        if (settings.settings?.enable_booking_notice) {
            setShowReservationNotice(true);
            setTimeout(() => {
                bookingNotice.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        } else {
            setShowSummary(true);
            startBookingTimer();
        }

        // Setup seating time
        const timeItem: any = availability.find((item: any) => item.time === time);
        let seatingT = 0;
        timeItem.duration[guests] ? seatingT = timeItem.duration[guests] : seatingT = 120; // default duration 2 hours
        if (guests > 9) seatingT = 210; // default duration for more than 9 guests is 3.5 hours

        // Set seating time based on number of guests
        let seatingDuration = Math.floor(seatingT / 60) + "h";
        (seatingT % 60) > 0 ? seatingDuration += " : " + (seatingT % 60) + "mins" : "";
        setSeatingTime(seatingDuration);

        // Set down payment if applicable
        if (timeItem.payment && timeItem.payment > 0) {
            setDownPayment(parseInt(timeItem.payment));
            setTotalPrice(parseInt(timeItem.payment));
            form.setValue("deposite", parseInt(timeItem.payment));
        } else {
            setDownPayment(0);
        }

    }, [time]);

    useEffect(() => {
        if (showReservationNotice === false) {
            setShowSummary(true);
            startBookingTimer();
            setTimeout(() => {
                bookingForm.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }
    }, [showReservationNotice]);


    // Check if selected occasion items are available for the selected date
    function itemIsAvailable(item: any) {
        const today = new Date();
        const currentHour = today.getHours();
        const reservationDay = date.getDate();
        const reservationMonth = date.getMonth();
        const toDay = today.getDate();
        const currentMonth = today.getMonth();
        if ((reservationDay - toDay) >= item.reservation_availability_period || (reservationMonth > currentMonth)) {
            if (reservationDay == toDay && item.available_before_time <= currentHour) {
                return false;
            }
            return true;
        }
        return false;
    }

    async function book(values: z.infer<typeof formSchema>) {

        setLoading(true);
        const response = await makeReservation(values);
        setLoading(false);
        if (response.success) {

            // Set reservation data to local storage and state
            const reservation = JSON.parse(response.data.reservation);
            localStorage.setItem("reservation", JSON.stringify(reservation));
            setReservationSuccess(true);
            setReservation(reservation);
            setTimeout(() => {
                bookingSuccess.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
            // Hide form and summary
            resetBookingForm();
        }
    }

    const startBookingTimer = () => {

        // setRemainingTime(bookingWindow);
        localStorage.setItem("bookingStartTime", Date.now().toString());
        setShowTimer(true);
    }

    const handleFormTimeOut = () => {
        setShowSummary(false);
        setShowTimer(false);
        form.setValue("time", "");
        check(date, guests);
    }
    const resetBookingForm = () => {
        // setReservationSuccess(true);
        setShowForm(false);
        setShowTimer(false);
    }
    const resetBookingNotice = () => {
        setShowReservationNotice(false);
    };
    // useEffect(() => {
    //     if (reservation && reservation.id) {
    //         // Navigate after reservation state is set
    //         window.history.pushState({}, '', `?id=${reservation.id}`);
    //     }
    // }, [reservation]);

    return (
        <div className="content w-[90vw] max-w-[800px] flex flex-col items-center justify-center my-[104px] gap-12 clg:my-5">
            <div className="theme-border bg-[#e5cbbd] flex flex-col gap-4 p-8 tablet:p-0 w-full reservation-widget relative">
                <h2 className="text-3xl text-center font-Rufina font-semibold">{t("widgetTitle")}</h2>
                {settings.settings[`booking_intro_${locale}`] && (
                    <p className="text-center text-base mb-4">{settings.settings[`booking_intro_${locale}`]}</p>
                )}
                {showTimer && <ReservationTimer title={t("remainingTime")} time={bookingWindow} showTimer={showTimer} onTimeOut={handleFormTimeOut} />}
                {showSummary && (
                    <div ref={bookingForm} className="w-full flex flex-col gap-1 mb-4 animated zoomIn">
                        <h4 className="text-xl font-semibold text-center mb-4">{t("bookingDetails")}</h4>
                        <div className="w-full flex flex-col gap-1">
                            <div className="w-full flex flex-wrap gap-1 justify-center">
                                <ReservationSummaryWidget title={t("guests")} value={guests.toString()} subtitle={""} icon={<UsersRoundIcon />} />
                                <ReservationSummaryWidget title={t("date")} value={date?.toLocaleDateString()} subtitle={''} icon={<CalendarDaysIcon />} />
                                <ReservationSummaryWidget title={t("time")} value={time} subtitle={""} icon={<ClockIcon />} />
                                <ReservationSummaryWidget title={t("seating")} value={seatingTime} subtitle={""} icon={<ArmchairIcon />} />
                                {specialDay && <ReservationSummaryWidget title={t("specialDay")} value={specialDay[`name_${locale}`]} subtitle={""} icon={<GemIcon />} />}
                            </div>
                        </div>
                        {showTimer && <Button variant="default" className="mt-4 mx-auto" onClick={() => form.setValue("time", "")}>{t("editBooking")}</Button>}
                    </div>
                )}
                {reservation &&
                    <div ref={bookingSuccess} className="w-full"><ReservationSuccessWidget title={t('reservationSuccessTitle')} reservation={reservation} /></div>
                }
                {showForm &&
                    <Form {...form} >

                        <form onSubmit={form.handleSubmit(book)} className="flex flex-col w-full gap-4 animated zoomIn">
                            {!showSummary &&
                                <div className="gap-4 flex flex-col">
                                    <div className="flex gap-4 tablet:flex-col">
                                        <FormField control={form.control} name="guests" render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel>{t("guests")}</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min={settings.settings.booking_min_guests || 2} max={settings.settings.booking_max_guests || 12} step="1" {...field} value={field.value ?? ""} className="w-24" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }}
                                        />
                                        <FormField control={form.control} name="date" render={({ field }) => {
                                            return <FormItem className="">
                                                <div>
                                                    <FormLabel>{t("selectDate")}</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                id="date"
                                                                className="w-48 justify-between font-normal"
                                                            >
                                                                {field.value ? field.value.toLocaleDateString() : "Select date"}
                                                                <ChevronDownIcon />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                defaultMonth={date}
                                                                onSelect={(date) => {
                                                                    field.onChange(date ?? field.value);
                                                                    // check(date, guests);
                                                                    setOpen(false)
                                                                }}
                                                                disabled={{ before: new Date() }}
                                                                showOutsideDays={false}
                                                                // timeZone='Asia/Riyadh'
                                                                className="rounded-lg border"
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }}
                                        />
                                        {specialDay && <div className="flex items-end font-Rufina text-xl pb-[4px] font-semibold"><div className="flex items-center gap-4"><CelebrationSymbol size={32} />{specialDay[`name_${locale}`]}</div></div>}
                                    </div>
                                    <FormField control={form.control} name="time" render={({ field }) => {
                                        return <FormItem>
                                            <FormLabel>{t("selectTime")}</FormLabel>
                                            <FormControl>
                                                <ToggleGroup type="single" variant="outline" className="flex-wrap justify-start gap-2" value={field.value} onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}>
                                                    {availability.length > 0 ?
                                                        availability.map((item: { time: string, payment?: number }, index) => (
                                                            <ToggleGroupItem key={index} value={item?.time} className="h-auto p-0 select-none">
                                                                <div className="flex flex-col items-center justify-center">
                                                                    <p className="w-full text-sm flex p-2">{item?.time}</p>
                                                                    {item.payment &&
                                                                        <p className="w-full flex justify-center text-xs flex p-2 gap-1 border-t border-black bg-[#fa9898] hover:text-black rounded-b-md"><CurrencySymbol /> {item.payment} <DownPaymentSymbol /></p>
                                                                    }
                                                                </div>
                                                            </ToggleGroupItem>
                                                        ))
                                                        : <h3>{t("noAppointment")}</h3>
                                                    }

                                                </ToggleGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    }}
                                    />
                                    {showReservationNotice && <div ref={bookingNotice} className="bg-white text-base p-8 rounded-lg mt-4 flex flex-col items-center whitespace-pre-wrap shadow-lg animated zoomIn" >
                                        <p className="pb-4">{settings.settings[`booking_notice_${locale}`]}</p>
                                        <Button className="mt-4" onClick={resetBookingNotice}>{t("agree")}</Button>
                                    </div>}
                                </div>}
                            {showTimer && <div className="flex flex-col gap-4 tablet:flex-col justify-items-stretch animated zoomIn">

                                <div className="flex gap-4 tablet:flex-col justify-items-stretch">
                                    <FormField control={form.control} name="firstName" render={({ field }) => {
                                        return <FormItem className="w-full">
                                            <FormLabel>{t("firstName")}</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value ?? ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    }}
                                    />
                                    <FormField control={form.control} name="lastName" render={({ field }) => {
                                        return <FormItem className="w-full">
                                            <FormLabel>{t("lastName")}</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value ?? ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    }}
                                    />
                                </div>
                                <div className="flex gap-4 tablet:flex-col justify-items-stretch w-full">
                                    <FormField
                                        control={form.control}
                                        name="mobile"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-left">Phone Number</FormLabel>
                                                <FormControl className="w-full">
                                                    <PhoneInput placeholder="Enter a phone number" {...field} className="w-full" defaultCountry="SA" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField control={form.control} name="emailAddress" render={({ field }) => {
                                        return <FormItem className="w-full">
                                            <FormLabel>{t("email")}</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value ?? ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    }}
                                    />
                                </div>
                                <FormField control={form.control} name="specialRequest" render={({ field }) => {
                                    return <FormItem className="w-full">
                                        <FormLabel>{t("specialRequest")}</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                                />
                                <FormField control={form.control} name="occasion" render={({ field }) => {
                                    return <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={(checked) => { field.onChange(checked) }} />
                                        </FormControl>
                                        <FormLabel className="!mt-0">{t("specialOccasion")}</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                }}
                                />
                                {occasion === true &&
                                    <div className="flex flex-col gap-2 border-b border-black boder-b-0">
                                        <FormField control={form.control} name="occasionType" render={({ field }) => {
                                            return <FormItem className="w-full">
                                                <FormLabel>{t('occasion')}</FormLabel>
                                                <FormControl>
                                                    <ToggleGroup type="single" variant="outline" className="flex-wrap justify-start gap-2" value={field.value} onValueChange={(value) => { field.onChange(value) }}>
                                                        {occasions &&
                                                            occasions.map((item: any, index: number) => (
                                                                <ToggleGroupItem key={index} value={item.key}>{item[`name_${locale}`]}</ToggleGroupItem>
                                                            ))
                                                        }
                                                    </ToggleGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }}
                                        />
                                        {/* Occasion items */}
                                        {settings.settings?.enable_occasion_items &&
                                            <div className="pb-4">
                                                <h4 className="py-4 text-base font-bold">{settings.settings[`occasion_items_title_${locale}`]}</h4>
                                                <div className="flex flex-col w-full gap-6">
                                                    {occasionItems.map((category: any, catIndex: number) => (
                                                        category.items && category.items.length > 0 && (
                                                            <div key={catIndex} className="flex flex-col w-full gap-4 pb-6 border-b border-mainColor">
                                                                <h4 className="font-normal text-mainColor ss:text-[1.5rem] text-[2rem] text-center pt-2">
                                                                    {category[`name_${locale}`]}
                                                                </h4>
                                                                <div className="grid grid-cols-1 gap-4 w-full">
                                                                    {category.items.map((item: any, itemIndex: number) => {
                                                                        const isAvailable = itemIsAvailable(item);
                                                                        const hasVariations = item.has_variations && item.variations && item.variations.length > 0;
                                                                        const firstVarGroup = hasVariations ? item.variations[0] : null;
                                                                        const itemSelectedOptions = selectedOccasionItems.filter(s => s.itemId === item.id);

                                                                        return (
                                                                            <div
                                                                                key={item.id || itemIndex}
                                                                                className="w-full relative occasion-item bg-white theme-border rounded-lg p-4 flex flex-col gap-3 shadow-sm"
                                                                            >
                                                                                {!isAvailable && (
                                                                                    <div className="absolute inset-0 bg-white/90 z-10 flex items-center justify-center rounded-lg">
                                                                                        <p className="text-red-600 font-bold text-sm">{t('notAvailableForSelectedDate')}</p>
                                                                                    </div>
                                                                                )}
                                                                                <div className="w-full flex flex-row ss:flex-col justify-start gap-4">
                                                                                    <Image
                                                                                        src={'https://fls-9e8f049b-831e-4138-b0b6-1ce5ada62bd6.laravel.cloud/' + item.image}
                                                                                        alt={item[`name_${locale}`] || "occasion item"}
                                                                                        height={80}
                                                                                        width={80}
                                                                                        className="rounded-md object-cover flex-shrink-0"
                                                                                        style={{ width: 80, height: 80 }}
                                                                                    />
                                                                                    <div className="flex flex-col w-full justify-between">
                                                                                        <div className="flex justify-between items-start w-full gap-2">
                                                                                            <h2 className="font-Rufina text-xl font-bold ltr:text-left rtl:text-right leading-none">
                                                                                                {item[`name_${locale}`]}
                                                                                            </h2>
                                                                                            <div className="flex items-center text-lg font-semibold whitespace-nowrap gap-1 text-mainColor">
                                                                                                <CurrencySymbol />
                                                                                                <span>
                                                                                                    {hasVariations && firstVarGroup?.values?.length > 0
                                                                                                        ? (firstVarGroup.values.some((v: any) => v.price != null && v.price !== "")
                                                                                                            ? `${Math.min(...firstVarGroup.values.map((v: any) => parseFloat(v.price || item.price || 0)))}`
                                                                                                            : `${item.price || 0}`)
                                                                                                        : `${item.price || 0}`
                                                                                                    }
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        {item[`description_${locale}`] && (
                                                                                            <p className={`text-sm text-gray-600 ${locale === 'en' ? 'text-left pt-2' : 'text-right pt-2'}`}>
                                                                                                {item[`description_${locale}`]}
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                {/* Action / Variation Controls */}
                                                                                {hasVariations && firstVarGroup ? (
                                                                                    <div className="w-full pt-3 border-t border-stone-200 flex flex-col gap-3">
                                                                                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                                                                                            <div className="flex-1 min-w-[200px]">
                                                                                                <Select
                                                                                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                                                                                    value={selectedVariationOptions[item.id]}
                                                                                                    onValueChange={(val) => {
                                                                                                        setSelectedVariationOptions(prev => ({ ...prev, [item.id]: val }));
                                                                                                    }}
                                                                                                    disabled={!isAvailable}
                                                                                                >
                                                                                                    <SelectTrigger className="w-full bg-stone-50 border-stone-300 text-sm h-9">
                                                                                                        <SelectValue placeholder={`${t("select")} ${locale === 'ar' ? (firstVarGroup.name_ar || firstVarGroup.name_en) : (firstVarGroup.name_en || firstVarGroup.name_ar)}`} />
                                                                                                    </SelectTrigger>
                                                                                                    <SelectContent dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                                                                                                        {firstVarGroup.values.map((valObj: any, vIdx: number) => {
                                                                                                            const vPrice = valObj.price != null && valObj.price !== ""
                                                                                                                ? parseFloat(valObj.price)
                                                                                                                : (item.price != null ? parseFloat(item.price) : 0);
                                                                                                            const vLabel = locale === 'ar' ? (valObj.value_ar || valObj.value_en) : (valObj.value_en || valObj.value_ar);
                                                                                                            return (
                                                                                                                <SelectItem key={vIdx} value={valObj.value_en}>
                                                                                                                    <div className="flex items-center justify-between w-full gap-4">
                                                                                                                        <span>{vLabel}</span>
                                                                                                                        <span className="font-semibold text-xs text-mainColor">
                                                                                                                            {vPrice} {locale === 'ar' ? 'ر.س' : 'SAR'}
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                </SelectItem>
                                                                                                            );
                                                                                                        })}
                                                                                                    </SelectContent>
                                                                                                </Select>
                                                                                            </div>
                                                                                            <Button
                                                                                                type="button"
                                                                                                size="sm"
                                                                                                disabled={!isAvailable || !selectedVariationOptions[item.id]}
                                                                                                className="h-9 px-4 gap-1.5 flex items-center bg-[#381112] hover:bg-[#4d191b] text-white disabled:opacity-50"
                                                                                                onClick={() => {
                                                                                                    const currentValEn = selectedVariationOptions[item.id];
                                                                                                    if (!currentValEn) return;
                                                                                                    const valObj = firstVarGroup.values.find((v: any) => v.value_en === currentValEn);
                                                                                                    if (valObj) {
                                                                                                        handleAddVariation(item, firstVarGroup, valObj);
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                <Plus className="w-4 h-4" />
                                                                                                <span>{t("addOption")}</span>
                                                                                            </Button>
                                                                                        </div>

                                                                                        {/* Selected variation list with quantity steppers */}
                                                                                        {itemSelectedOptions.length > 0 && (
                                                                                            <div className="flex flex-col gap-2 pt-2 border-t border-dashed border-stone-200">
                                                                                                {itemSelectedOptions.map((selItem) => (
                                                                                                    <div
                                                                                                        key={selItem.uniqueKey}
                                                                                                        className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-sm"
                                                                                                    >
                                                                                                        <div className="flex flex-col">
                                                                                                            <span className="font-medium text-stone-800">
                                                                                                                {locale === 'ar' ? (selItem.variationValueAr || selItem.variationValueEn) : (selItem.variationValueEn || selItem.variationValueAr)}
                                                                                                            </span>
                                                                                                            <span className="text-xs text-stone-500 flex items-center gap-1">
                                                                                                                <CurrencySymbol size={12} /> {selItem.unitPrice} {selItem.count > 1 ? `× ${selItem.count} = ${selItem.unitPrice * selItem.count}` : ''}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <div className="flex items-center gap-2">
                                                                                                            <Button
                                                                                                                type="button"
                                                                                                                size="icon"
                                                                                                                variant="outline"
                                                                                                                className="h-7 w-7 rounded-full bg-white hover:bg-stone-100 p-0 border-stone-300"
                                                                                                                onClick={() => handleDecrement(selItem.uniqueKey)}
                                                                                                            >
                                                                                                                <Minus className="w-3.5 h-3.5" />
                                                                                                            </Button>
                                                                                                            <span className="w-6 text-center font-semibold text-sm select-none">
                                                                                                                {selItem.count}
                                                                                                            </span>
                                                                                                            <Button
                                                                                                                type="button"
                                                                                                                size="icon"
                                                                                                                variant="outline"
                                                                                                                className="h-7 w-7 rounded-full bg-white hover:bg-stone-100 p-0 border-stone-300"
                                                                                                                onClick={() => handleIncrement(selItem.uniqueKey)}
                                                                                                            >
                                                                                                                <Plus className="w-3.5 h-3.5" />
                                                                                                            </Button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    /* Non-variation item controls */
                                                                                    <div className="w-full pt-3 border-t border-stone-200 flex items-center justify-end">
                                                                                        {(() => {
                                                                                            const uniqueKey = `${item.id}-default`;
                                                                                            const added = selectedOccasionItems.find(s => s.uniqueKey === uniqueKey);
                                                                                            if (!added) {
                                                                                                return (
                                                                                                    <Button
                                                                                                        type="button"
                                                                                                        size="sm"
                                                                                                        disabled={!isAvailable}
                                                                                                        className="h-9 px-4 gap-1.5 flex items-center bg-[#381112] hover:bg-[#4d191b] text-white"
                                                                                                        onClick={() => handleAddNonVariation(item)}
                                                                                                    >
                                                                                                        <Plus className="w-4 h-4" />
                                                                                                        <span>{t("addItem")}</span>
                                                                                                    </Button>
                                                                                                );
                                                                                            }
                                                                                            return (
                                                                                                <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-md px-3 py-1">
                                                                                                    <Button
                                                                                                        type="button"
                                                                                                        size="icon"
                                                                                                        variant="outline"
                                                                                                        className="h-7 w-7 rounded-full bg-white hover:bg-stone-100 p-0 border-stone-300"
                                                                                                        onClick={() => handleDecrement(uniqueKey)}
                                                                                                    >
                                                                                                        <Minus className="w-3.5 h-3.5" />
                                                                                                    </Button>
                                                                                                    <span className="w-6 text-center font-semibold text-sm select-none">
                                                                                                        {added.count}
                                                                                                    </span>
                                                                                                    <Button
                                                                                                        type="button"
                                                                                                        size="icon"
                                                                                                        variant="outline"
                                                                                                        className="h-7 w-7 rounded-full bg-white hover:bg-stone-100 p-0 border-stone-300"
                                                                                                        onClick={() => handleIncrement(uniqueKey)}
                                                                                                    >
                                                                                                        <Plus className="w-3.5 h-3.5" />
                                                                                                    </Button>
                                                                                                </div>
                                                                                            );
                                                                                        })()}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                                {selectedOccasionItems.length > 0 &&
                                                    <div className="flex justify-center w-full">
                                                        <Button type="button" variant="default" className="mt-4 mx-auto" onClick={() => { setCardEnabled(true) }}>{t("addCardButton")}</Button>
                                                    </div>
                                                }
                                                {cardEnabled &&
                                                    <FormField control={form.control} name="cardContent" render={({ field }) => {
                                                        return <FormItem className="w-full mt-4">
                                                            <FormLabel>{t("cardTitle")}</FormLabel>
                                                            <FormControl>
                                                                <Textarea {...field} placeholder={t("cardPlaceholder")} rows={5} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    }}
                                                    />
                                                }
                                                <h4 className="py-4 text-sm">{settings.settings[`occasion_items_notice_${locale}`]}</h4>
                                            </div>
                                        }

                                    </div>

                                }
                                <FormField control={form.control} name="allergic" render={({ field }) => {
                                    return <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={(checked) => { field.onChange(checked) }} />
                                        </FormControl>
                                        <FormLabel className="!mt-0">{t('foodAllergies')}</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                }}
                                />
                                {allergic === true &&
                                    <FormField control={form.control} name="allergies" render={({ field }) => {
                                        return <FormItem className="w-full">
                                            <FormControl>
                                                <ToggleGroup type="multiple" variant="outline" className="flex-wrap justify-start gap-2" value={field.value} onValueChange={(value) => { field.onChange(value) }}>
                                                    {allergies &&
                                                        allergies.map((item: any, index: number) => (
                                                            <ToggleGroupItem key={index} value={item.key}>{item[`name_${locale}`]}</ToggleGroupItem>
                                                        ))
                                                    }
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    }}
                                    />
                                }
                            </div>}
                            {(orderItems.length > 0 || downPayment > 0) && showTimer &&
                                <div className="bg-white px-2 py-4 rounded-lg shadow-md flex-1 flex flex-col justify-center items-center text-center w-full px-6 mt-4">
                                    <h3 className="text-xl font-semibold">{t('paymentTitle')}</h3>

                                    {orderItems &&
                                        orderItems.map((item, index) => (
                                            <PaymentItem key={index} title={item.title} value={item.value} />
                                        ))
                                    }
                                    {addVat && vat > 0 &&
                                        <PaymentItem title={`${t('vat')} (${settings.settings.vat_value}%)`} value={vat} />
                                    }
                                    {downPayment > 0 &&
                                        <PaymentItem title={t('downPayment')} value={downPayment} />
                                    }
                                    {totalPrice > 0 && <div className="w-full flex justify-between text-xl font-semibold sm:text-base pt-4 pb-2 text-left rtl:text-right">
                                        <p className=" ">Total</p>
                                        <p className="flex items-center gap-2"><CurrencySymbol size={20} />{totalPrice}</p>
                                    </div>}
                                </div>
                            }
                            <div className="w-full flex flex-col gap-4 pt-4">
                                {(downPayment > 0 || price > 0) && showTimer &&
                                    <FormField control={form.control} name="paymentPolicyAccepted" render={({ field }) => {
                                        return <FormItem className="w-full">
                                            <FormControl>
                                                <div className="flex items-start gap-3">
                                                    <Checkbox id="termsAccepted" checked={field.value} onCheckedChange={field.onChange} />
                                                    <Label htmlFor="termsAccepted"><Link href={`/${locale}/payment-policy`} target="_blank">{t('paymentPolicy')}</Link></Label>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    }}
                                    />
                                }
                                {showTimer &&
                                    <FormField control={form.control} name="termsAccepted" render={({ field }) => {
                                        return <FormItem className="w-full">
                                            <FormControl>
                                                <div className="flex items-start gap-3">
                                                    <Checkbox id="termsAccepted" checked={field.value} onCheckedChange={field.onChange} />
                                                    <Label htmlFor="termsAccepted"><Link href={`/${locale}/terms`} target="_blank">{t('termsAndService')}</Link></Label>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    }}
                                    />
                                }
                            </div>
                            {availability.length > 0 ?
                                <Button type="submit" disabled={!termsAccepted || time == '' || (downPayment > 0 && !paymentPolicyAccepted)} className="mt-4">{t('book')}</Button>
                                : ''}
                        </form>
                    </Form>
                }
                {loading &&
                    <div className="">
                        <div className="loader"></div>
                        <div className="loader-container flex">
                        </div>
                    </div>}

            </div>
        </div>
    )
}