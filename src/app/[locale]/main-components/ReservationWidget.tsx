"use client";
import { useDebounce } from "use-debounce";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ChevronDownIcon, UsersRoundIcon, CalendarDaysIcon, ClockIcon, ArmchairIcon, GemIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useRouter, useSearchParams } from 'next/navigation';
// import { redirect } from "next/navigation";

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

export default function ReservationWidget({settings}: any) {

const locale = useLocale();
// console.log(settings);

const bookingWindow = settings.settings.booking_time_window ? settings.settings.booking_time_window * 60000 : 300000; // 5 minutes in milliseconds
const t = useTranslations("reservationPage");
const [open, setOpen] = useState(false);
const [loading, setLoading] = useState<Boolean>(true);
const [showSummary, setShowSummary] = useState<Boolean>(false);
const [cardEnabled, setCardEnabled] = useState<Boolean>(false);
const [remainingTime, setRemainingTime] = useState(bookingWindow); // 5 minutes in milliseconds
const [seatingTime, setSeatingTime] = useState('0');
const [availability, setAvailability] = useState([]);
const [specialDay, setSpecialDay] = useState(null);
const [price, setPrice] = useState(0);
const [vat, setVat] = useState(0);
const [totalPrice, setTotalPrice] = useState(0);
const [downPayment, setDownPayment] = useState(null);
const [orderItems, setOrderItems] = useState<Array<{ title: string, value: number }>>([]);
const occasions:Array<string> = Object.values(settings.occasions) ?? [];
const allergies:Array<string> = Object.values(settings.foodAllergies) ?? [];
const occasionItems:Array<string> = Object.values(settings.occasionItems) ?? [];

const router = useRouter();
const searchParams = useSearchParams();
const searchDate = searchParams.get('date') || '';
const searchTime = searchParams.get('time') || '';
const searchGuests = searchParams.get('guests') || '';


// Availability check function
const check = async function(date: Date, guests?: number) {
    setLoading(true);
    // console.log('Availability check for date: ' + date);
    const availability = await checkAvailability(date, guests);
    // console.log(availability);
    // console.log(availability?.success);
    if (availability?.success == true) {
        // console.log('Availability times: ' + {...availability});
        setAvailability(availability?.data);
        setSpecialDay(availability?.specialDay);
        setLoading(false);
        // console.log(`Availability Special Day: ${availability?.specialDay}`);
    } else {
        setAvailability([]);
        setLoading(false);
        // console.log('Failed to fetch availability');
    }
}

// Add search params to URL
const addSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (date) {
        // console.log("Search params" + date);
      params.set('date', date.toLocaleString('sv-SE', { timeZone: 'Asia/Riyadh', dateStyle: 'short' }));
    } else {
      params.delete('date');
    }
    if (guests) {
      params.set('guests', guests.toString());
    } else {
      params.delete('guests');
    }

    router.push(`?${params.toString()}`, { scroll: false });
}

// Form schema and setup
const formSchema = z.object({
    date: z.date() || z.undefined(),
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
    occasionSelectedItems: z.array(z.string()),
    occasionItemsPrice: z.number(),
    cardContent: z.string().max(255, {
        message: t('cardContentPattern')
    }),
    allergic: z.boolean(),
    allergies: z.array(z.string()),
    paymentPolicyAccepted: z.boolean(),
    termsAccepted: z.boolean(),
})
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // mode: "onSubmit",
    defaultValues: {
        date: searchDate ? new Date(searchDate) : new Date(),
        time: searchTime ? searchTime : "",
        guests: searchGuests ? parseInt(searchGuests) : 2,
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

useEffect(() => {
    addSearchParams();
}, [date, guests, searchParams, router]);

const [debouncedDate] = useDebounce(date, 300);
const [debouncedGuests] = useDebounce(guests, 800);
useEffect(()=> {
    // console.log("useEffect triggered: ", { date, guests });
    // console.log('Debounce useEffect triggered');
    check(debouncedDate, debouncedGuests);
    
}, [debouncedDate, debouncedGuests]);

// Calculate total price of selected occasion items
useEffect(()=> {
    let price = 0;
    let total = 0;
    // console.log(occasionSelectedItems);
    setOrderItems([]);
    occasionSelectedItems.forEach((itemId: any) => {
        occasionItems.forEach((category: any) => {
            const item:any = category.items.find((item: any) => item.id == itemId);
            if (item) {
                price += item.price;
                setOrderItems((prevItems) => [...prevItems, { title: item[`name_${locale}`], value: item.price }]);
            }
        });
    });
    setPrice(price);
    // Update form value
    // console.log(`Enable Vat Setting: ${settings.settings.add_calculated_vat}`);
    // console.log(`Vat Percentage: ${settings.settings.vat_value}`);
    if (settings.settings.add_calculated_vat) {
        const vat = price * (settings.settings.vat_value / 100);
        setVat(vat.toFixed(2) as unknown as number);
        setPrice(price);
        total = price + vat;
        setTotalPrice(total.toFixed(2) as unknown as number);
        form.setValue("occasionItemsPrice", totalPrice);
    } else {
        setTotalPrice(price);
        form.setValue("occasionItemsPrice", price);
    }
}, [occasionSelectedItems]);

// Time selection effect
useEffect(() => {
    // console.log('Time has changed')
    // console.log('Time value: ' + time)
    if (!time) return;
    setShowSummary(time ? true : false);
    setRemainingTime(bookingWindow);
    const timeItem: any = availability.find((item: any) => item.time === time);
    let seatingT = 0;
    timeItem.duration[guests] ? seatingT = timeItem.duration[guests] : seatingT = 120; // default duration 2 hours
    if (guests > 9) seatingT = 210; // default duration 1 hour
    let seatingDuration = Math.floor(seatingT / 60) + "h";
    (seatingT % 60) > 0 ?  seatingDuration += " : " + (seatingT % 60)  + "mins" : "";
    setSeatingTime(seatingDuration);
    if (timeItem.payment && timeItem.payment > 0) {
        setDownPayment(timeItem.payment);
    } else {
        setDownPayment(null);
    }
    // startTimer();
    const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
            if (prevTime <= 0) {
                setShowSummary(false);
                form.setValue("time", "");
                check(date, guests);
                clearInterval(interval);
            }
            return prevTime - 1000
        });
        if(form.getValues("time") === "") {
            clearInterval(interval);
        }
    }, 1000);
    return () => clearInterval(interval);
}, [time]);


// Check if selected occasion items are available for the selected date
function itemIsAvailable(item: any) {
    const today = new Date();
    const reservationDay = date.getDate();
    const reservationMonth = date.getMonth();
    const toDay = today.getDate();
    const currentMonth = today.getMonth();
    if ((reservationDay - toDay) >= item.reservation_availability_period || (reservationMonth > currentMonth)) {
        return true;
    }
    return false; 
}

async function book(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // console.log('form submit');
    const response = await makeReservation(values);
    // console.log(response);
    setLoading(false);
    if (response.success) {
    // redirect(`${locale}/home`);
  }
}

  return (
    <div className="content w-[90vw] max-w-[800px] flex flex-col items-center justify-center my-[104px] gap-12 clg:my-5">
        <div className="theme-background flex flex-col gap-4 p-8 tablet:p-0 w-full reservation-widget relative">
            <h2 className="text-3xl text-center font-Rufina">{t("widgetTitle")}</h2>
            {showSummary && (
                <div className="w-full flex flex-col gap-1 mb-4">
                    <h4 className="text-sm text-center mt-4 mb-1">{t("remainingTime")}</h4>
                    <h4 className="text-4xl text-center ltr mb-4" style={{direction: 'ltr'}}>{Math.floor(remainingTime / 60000).toString().padStart(2, '0')} : {Math.floor((remainingTime % 60000) / 1000).toString().padStart(2, '0')}</h4>
                    <h4 className="text-xl font-semibold text-center mb-4">{t("bookingDetails")}</h4>
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-full flex flex-wrap gap-1 justify-center">
                            <ReservationSummaryWidget title={t("guests")} value={guests.toString()} subtitle={""} icon={<UsersRoundIcon />} />
                            <ReservationSummaryWidget title={t("date")} value={date?.toLocaleDateString()} subtitle={''} icon={<CalendarDaysIcon />} />
                            <ReservationSummaryWidget title={t("time")} value={time} subtitle={""} icon={<ClockIcon />}/>
                            <ReservationSummaryWidget title={t("seating")} value={seatingTime} subtitle={""} icon={<ArmchairIcon />}/>
                            {specialDay && <ReservationSummaryWidget title={t("specialDay")} value={specialDay[`name_${locale}`]} subtitle={""} icon={<GemIcon />} />}
                        </div>
                        {/* <p className="text-center pt-4">{t("seating")} : {seatingTime}</p> */}
                    </div>
                    <Button variant="default" className="mt-4 mx-auto" onClick={()=> {setShowSummary(false); form.setValue("time", "")}}>{t("editBooking")}</Button>
                </div>
            )}
            <Form {...form} >
                <form onSubmit={form.handleSubmit(book)} className="flex flex-col w-full gap-4">
                {!showSummary && 
                <div className="gap-4 flex flex-col">
                   <div className="flex gap-4 tablet:flex-col">
                    <FormField control={form.control} name="guests" render={({field}) => {
                        return <FormItem>
                            <FormLabel>{t("guests")}</FormLabel>
                            <FormControl>
                                <Input type="number" min={settings.settings.booking_min_guests || 2} max={settings.settings.booking_max_guests || 12} step="1" {...field} value={field.value ?? ""} className="w-24"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} 
                    />
                    <FormField control={form.control} name="date" render={({field}) => {
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
                    {specialDay && <div className="flex items-end pb-2 font-semibold">{specialDay[`name_${locale}`]}</div>}
                    </div>
                    <FormField control={form.control} name="time" render={({field}) => {
                        return <FormItem>
                            <FormLabel>{t("selectTime")}</FormLabel>
                            <FormControl>
                                <ToggleGroup type="single" variant="outline" className="flex-wrap justify-start gap-2" value={field.value} onValueChange={(value)=>{
                                    // console.log(value); 
                                    field.onChange(value); 
                                    // console.log(field.value)
                                    }}>
                                    {availability.length > 0 ? 
                                        availability.map((item: { time: string, payment?: number }, index) => (
                                            <ToggleGroupItem key={index} value={item?.time} className="h-auto p-0 select-none">
                                                <div className="flex flex-col items-center justify-center">
                                                    <p className="w-full text-sm flex p-2">{item?.time}</p>
                                                    {item.payment && 
                                                        <p className="w-full flex justify-center text-xs flex p-2 gap-1 border-t border-black bg-[#fa9898] hover:text-black rounded-b-md"><DownPaymentSymbol/> {item.payment} <CurrencySymbol/></p>
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
                </div>}
                    {time && <div className="flex flex-col gap-4 tablet:flex-col justify-items-stretch">

                    <div className="flex gap-4 tablet:flex-col justify-items-stretch">
                            <FormField control={form.control} name="firstName" render={({field}) => {
                                return <FormItem className="w-full">
                                    <FormLabel>{t("firstName")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value ?? ""}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} 
                            />
                        <FormField control={form.control} name="lastName" render={({field}) => {
                            return <FormItem className="w-full">
                                <FormLabel>{t("lastName")}</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} 
                        />
                    </div>
                    <div className="flex gap-4 tablet:flex-col justify-items-stretch w-full">
                    {/* <FormField control={form.control} name="mobile" render={({field}) => {
                        return <FormItem className="w-full">
                            <FormLabel>{t("mobile")}</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value ?? ""}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} 
                    /> */}
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormLabel className="text-left">Phone Number</FormLabel>
                            <FormControl className="w-full">
                                <PhoneInput placeholder="Enter a phone number" {...field} className="w-full" defaultCountry="SA" />
                                {/* <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="RU"
                                placeholder="Enter phone number"
                                value={field.value}
                                onChange={field.onChange}
                                className="flex w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                /> */}
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField control={form.control} name="emailAddress" render={({field}) => {
                        return <FormItem className="w-full">
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value ?? ""}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} 
                    />
                    </div>
                    <FormField control={form.control} name="specialRequest" render={({field}) => {
                        return <FormItem className="w-full">
                            <FormLabel>{t("specialRequest")}</FormLabel>
                            <FormControl>
                                <Textarea {...field} value={field.value ?? ""}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} 
                    />
                    <FormField control={form.control} name="occasion" render={({field}) => {
                        return <FormItem className="flex items-center gap-2">
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={(checked)=> {field.onChange(checked)}}/>
                            </FormControl>
                            <FormLabel className="!mt-0">{t("specialOccasion")}</FormLabel>
                            <FormMessage />
                        </FormItem>
                    }} 
                    />
                    {occasion === true && 
                    <div className="flex flex-col gap-2 border-b border-black boder-b-0">
                        <FormField control={form.control} name="occasionType" render={({field}) => {
                            return <FormItem className="w-full">
                                <FormLabel>{t('occasion')}</FormLabel>
                                <FormControl>
                                    <ToggleGroup type="single" variant="outline" className="flex-wrap justify-start gap-2" value={field.value} onValueChange={(value)=>{field.onChange(value)}}>
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
                                <FormField control={form.control} name="occasionSelectedItems" render={({field}) => {
                            return <FormItem className="w-full">
                                <FormControl>
                                <ToggleGroup type="multiple" dir={locale === 'en' ? 'ltr' : 'rtl'} variant="outline" className="flex-wrap justify-start gap-2" value={field.value} onValueChange={(value)=>{field.onChange(value)}}>
                                    {occasionItems.map((category: any, index: number) => (
                                        category.items.length > 0 && (
                                            <div key={index} className="flex flex-col w-full gap-4">
                                            <h4 className="font-bold text-base pt-2">{category[`name_${locale}`]}</h4>
                                            {category.items.map((item: any, index: number) => (
                                                <ToggleGroupItem disabled={!itemIsAvailable(item)} key={index} value={item.id.toString()} className="w-full h-auto justify-start rtl:justify-end p-4 relative">
                                                    {!itemIsAvailable(item) && (
                                                        <div className="absolute top-0 left-0 w-full h-full bg-white/70 z-10 flex items-center justify-center">
                                                            <p className="text-red-600 font-bold">{t('notAvailableForSelectedDate')}</p>
                                                        </div>
                                                    )}
                                                    <div className="w-full flex justify-start gap-4">
                                                        <Image
                                                        src={'https://fls-9e8f049b-831e-4138-b0b6-1ce5ada62bd6.laravel.cloud/' + item.image}
                                                        // alt={lang === "en" ? item.name_en : item.name_ar}
                                                        alt={"image"}
                                                        height={80}
                                                        width={80}
                                                        style={{width: 80, height: 80}}
                                                        />
                                                        <div className="flex flex-col w-full justify-start">
                                                            <div className="flex justify-between items-center w-full">
                                                                <h2 className="font-Rufina text-xl font-bold ltr:text-left rtl:text-right leading-none">{item[`name_${locale}`]}</h2>
                                                                <p className="flex gap-1">
                                                                    {item.price}
                                                                    <CurrencySymbol />
                                                                </p>
                                                            </div>
                                                            <p className={locale === 'en' ? 'text-left pt-2' : 'text-right pt-2'}>{item[`description_${locale}`]}</p>
                                                            {/* <p className="text-left">Notes</p> */}
                                                        </div>
                                                    </div>
                                                </ToggleGroupItem>
                                            ))}
                                        </div>
                                    )))}
                                </ToggleGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} 
                        />
                                { occasionSelectedItems.length > 0  && 
                                <div className="flex justify-center w-full">
                                    <Button type="button" variant="default" className="mt-4 mx-auto" onClick={()=> {setCardEnabled(true)}}>{t("addCardButton")}</Button>
                                </div>
                                }
                                { cardEnabled && 
                                    <FormField control={form.control} name="cardContent" render={({field}) => {
                                        return <FormItem className="w-full mt-4">
                                            <FormLabel>{t("cardTitle")}</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder={t("cardPlaceholder")} rows={5}/>
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
                    <FormField control={form.control} name="allergic" render={({field}) => {
                        return <FormItem className="flex items-center gap-2">
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={(checked)=> {field.onChange(checked)}}/>
                            </FormControl>
                            <FormLabel className="!mt-0">{t('foodAllergies')}</FormLabel>
                            <FormMessage />
                        </FormItem>
                    }} 
                    />
                    {allergic === true && 
                    <FormField control={form.control} name="allergies" render={({field}) => {
                        return <FormItem className="w-full">
                            <FormControl>
                                <ToggleGroup type="multiple" variant="outline" className="flex-wrap justify-start gap-2" value={field.value} onValueChange={(value)=>{field.onChange(value)}}>
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
                    {(orderItems.length > 0 || downPayment) && time && 
                        <div className="bg-white px-2 py-4 rounded-lg shadow-md flex-1 flex flex-col justify-center items-center text-center w-full px-6 mt-4">
                        <h3 className="text-xl font-semibold">{t('paymentTitle')}</h3>
                        { downPayment &&
                            <PaymentItem title={t('downPayment')} value={Math.floor(downPayment)} />
                        }
                        { orderItems &&
                            orderItems.map((item, index) => (
                                <PaymentItem key={index} title={item.title} value={Math.floor(item.value)} />
                            ))
                        }
                        <div className="w-full flex justify-between text-xl font-semibold sm:text-base pt-4 pb-2 text-left rtl:text-right">
                            <p className=" ">Total</p>
                            <p className="flex items-center gap-2">{orderItems.reduce((sum: number, item) => sum + Math.floor(item.value), 0) + Math.floor(downPayment ?? 0)} <CurrencySymbol size={20}/></p>
                        </div>
                    </div>
                    }
                    <div className="w-full flex flex-col gap-4 pt-4">
                    {(downPayment || price) ?     
                        <FormField control={form.control} name="paymentPolicyAccepted" render={({field}) => {
                            return <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="termsAccepted" checked={field.value} onCheckedChange={field.onChange}/>
                                        <Label htmlFor="termsAccepted"><Link href={`/${locale}/payment-policy`} target="_blank">{t('paymentPolicy')}</Link></Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        }}
                        />
                    : ''}
                    {time && 
                    <FormField control={form.control} name="termsAccepted" render={({field}) => {
                        // console.log(field)

                        return <FormItem className="w-full">
                            <FormControl>
                                <div className="flex items-start gap-3">
                                    <Checkbox id="termsAccepted" checked={field.value} onCheckedChange={field.onChange}/>
                                    <Label htmlFor="termsAccepted"><Link href={`/${locale}/terms`} target="_blank">{t('termsAndService')}</Link></Label>
                                </div>
                            </FormControl>
                        </FormItem>
                    }}
                    />
                    }
                    </div>
                    {availability.length > 0 ? 
                    <Button type="submit" disabled={!termsAccepted || time == '' || (downPayment !== null && !paymentPolicyAccepted)} className="mt-4">{t('book')}</Button>
                    : ''}
                </form>
            </Form>
            {loading && 
            <div className="">
                <div className="loader"></div>
                <div className="loader-container flex">
                    {/* <div className="flex w-full items-center justify-center">
                    </div> */}
                </div>
            </div>}
            
        </div>
    </div>
  )
}