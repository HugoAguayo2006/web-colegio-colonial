import { writeFile } from "node:fs/promises";
import { EVENTS } from "../src/data/events.js";

const calendarPath = new URL("../public/calendar/calendario.ics", import.meta.url);
const timeZone = "America/Mexico_City";
const exportMonthStart = "2026-08-01";
const exportMonthEnd = "2026-08-31";

const escapeText = (value) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");

const compactDate = (date) => date.replaceAll("-", "");
const compactTime = (time) => time.replace(":", "") + "00";

const parseDate = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const addDay = (date) => {
  const next = parseDate(date);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
};

const countWeekdays = (startDate, endDate) => {
  let count = 0;
  for (let day = parseDate(startDate); day <= parseDate(endDate); day.setUTCDate(day.getUTCDate() + 1)) {
    if (![0, 6].includes(day.getUTCDay())) count += 1;
  }
  return count;
};

const addHour = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return `${String((hours + 1) % 24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const calendarEvents = EVENTS.filter(
  (event) => event.date <= exportMonthEnd && (event.endDate || event.date) >= exportMonthStart
);

const eventLines = calendarEvents.flatMap((event) => {
  const start = event.start ?? "09:00";
  const end = event.end ?? addHour(start);
  const date = compactDate(event.date);
  const isDateRange = event.endDate && event.endDate !== event.date;

  if (isDateRange && !event.start) {
    return [
      "BEGIN:VEVENT",
      `UID:${event.id}@colegiocolonial.edu.mx`,
      "DTSTAMP:20260805T000000Z",
      `DTSTART;VALUE=DATE:${date}`,
      `DTEND;VALUE=DATE:${compactDate(addDay(event.endDate))}`,
      `SUMMARY:${escapeText(event.title)}`,
      ...(event.description ? [`DESCRIPTION:${escapeText(event.description)}`] : []),
      "LOCATION:Colegio Colonial",
      "END:VEVENT",
      "",
    ];
  }

  return [
    "BEGIN:VEVENT",
    `UID:${event.id}@colegiocolonial.edu.mx`,
    "DTSTAMP:20260805T000000Z",
    `DTSTART;TZID=${timeZone}:${date}T${compactTime(start)}`,
    `DTEND;TZID=${timeZone}:${date}T${compactTime(end)}`,
    ...(event.weekdaysOnly && isDateRange
      ? [`RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;COUNT=${countWeekdays(event.date, event.endDate)}`]
      : []),
    `SUMMARY:${escapeText(event.title)}`,
    ...(event.description ? [`DESCRIPTION:${escapeText(event.description)}`] : []),
    "LOCATION:Colegio Colonial",
    "END:VEVENT",
    "",
  ];
});

const calendar = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Colegio Colonial//Calendario Escolar//ES",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "X-WR-CALNAME:Colegio Colonial - Calendario Escolar",
  `X-WR-TIMEZONE:${timeZone}`,
  "",
  ...eventLines,
  "END:VCALENDAR",
  "",
].join("\r\n");

await writeFile(calendarPath, calendar, "utf8");
