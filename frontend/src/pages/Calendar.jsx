import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import koLocale from '@fullcalendar/core/locales/ko';
import "../CustomCalendar.css";

export default function Calendar() {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const calendarId = import.meta.env.VITE_CALENDAR_ID;

    return (
        <FullCalendar 
            plugins={[ dayGridPlugin, googleCalendarPlugin ]}
            initialView="dayGridMonth"
            googleCalendarApiKey={apiKey}
            events={{
                googleCalendarId: `${calendarId}`
            }}
            eventDisplay="block"
            locale={koLocale}
            titleFormat={{
                year: "numeric",
                month: "numeric"
            }}
            dayCellContent={(arg) => {
                return arg.date.getDate();
            }}
            height="auto"
        />
        )
}