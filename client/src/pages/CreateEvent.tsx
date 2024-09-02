import React, { FormEvent, useState } from "react";
import { createEvent } from "../util/fetch/createEvent";
import { useMasca } from "../hooks/useMasca";

export type DateTime = {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
};

const CreateEvent = () => {
  const now = new Date();
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState<DateTime>({
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    hour: now.getHours(),
    minute: now.getMinutes(),
  });
  const { vendorId, isVendor } = useMasca();
  if (!isVendor) return <p>Unauthorized</p>;

  const dateTimeToDate = (dateTime: DateTime) => {
    return new Date(
      dateTime.year,
      dateTime.month - 1,
      dateTime.day,
      dateTime.hour,
      dateTime.minute
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const date = dateTimeToDate(dateTime);

    if (!eventName || !location || !totalTickets || !vendorId) return;
    console.log("here");
    await createEvent(
      eventName,
      description,
      date,
      location,
      totalTickets,
      vendorId
    );
  };

  const onEventNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEventName(e.currentTarget.value);
  };

  const onDateTimeChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDateTime({
      ...dateTime,
      [e.currentTarget.name]: e.currentTarget.value
        ? parseInt(e.currentTarget.value)
        : "",
    });
  };

  const onLocationChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLocation(e.currentTarget.value);
  };

  const onTotalTicketsChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTotalTickets(parseInt(e.currentTarget.value));
  };

  const onDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  return (
    <div className="p-12 flex flex-col w-full items-center gap-8">
      <h1 className="font-semibold text-3xl mb-8">Create a new event.</h1>
      <form onSubmit={handleSubmit} className="flex-col flex w-1/3 gap-8">
        <input
          className="text-white transition-all hover:bg-opacity-10 focus:bg-opacity-10 outline-none  border-opacity-0   font-medium bg-white bg-opacity-[0.07] w-full p-4 rounded-lg text-xl"
          type="text"
          value={eventName}
          placeholder="Enter event name"
          onChange={onEventNameChange}
        />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">Description</p>
          <textarea
            value={description}
            onChange={onDescriptionChange}
            placeholder="Describe your event"
            className="p-4 bg-white bg-opacity-5 font-medium text-xl rounded-lg hover:bg-opacity-10 outline-none focus:bg-opacity-10"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="font-medium text-lg">Date</p>
          <div className="flex w-full">
            <input
              value={dateTime.day}
              placeholder="dd"
              type="number"
              className="bg-white bg-opacity-5 p-4 text-xl w-24 flex border-r-2 border-sky-500 rounded-l-lg hover:bg-opacity-10 outline-none focus:bg-opacity-10"
              onChange={onDateTimeChange}
              name="day"
            />
            <input
              value={dateTime.month}
              placeholder="mm"
              type="number"
              className="bg-white bg-opacity-5 p-4 text-xl flex w-24 border-r-2 border-sky-500 hover:bg-opacity-10 outline-none focus:bg-opacity-10"
              onChange={onDateTimeChange}
              name="month"
            />
            <input
              value={dateTime.year}
              placeholder="yyyy"
              type="number"
              className="bg-white bg-opacity-5 p-4 text-xl w-24 flex rounded-r-lg hover:bg-opacity-10 outline-none focus:bg-opacity-10"
              onChange={onDateTimeChange}
              name="year"
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="font-medium text-lg">Time</p>
          <div className="flex w-full">
            <input
              value={dateTime.hour}
              placeholder="dd"
              type="number"
              className="bg-white bg-opacity-5 p-4 text-xl w-24 flex border-r-2 border-sky-500 rounded-l-lg hover:bg-opacity-10 outline-none focus:bg-opacity-10"
              onChange={onDateTimeChange}
              name="hour"
            />
            <input
              value={dateTime.minute}
              placeholder="mm"
              type="number"
              className="bg-white bg-opacity-5 p-4 text-xl flex w-24 rounded-r-lg hover:bg-opacity-10 outline-none focus:bg-opacity-10"
              onChange={onDateTimeChange}
              name="minute"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">Location</p>
          <input
            type="text"
            value={location}
            onChange={onLocationChange}
            placeholder="Set a location"
            className="p-4 bg-white bg-opacity-5 font-medium text-xl rounded-lg outline-none hover:bg-opacity-10 focus:bg-opacity-10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">Total tickets</p>
          <input
            type="number"
            value={totalTickets}
            onChange={onTotalTicketsChange}
            placeholder="Total tickets"
            className="p-4 bg-white bg-opacity-5 font-medium text-xl rounded-lg hover:bg-opacity-10 outline-none focus:bg-opacity-10"
          />
        </div>

        <input
          type="submit"
          value="Create event"
          className="bg-sky-500 font-semibold p-4 rounded-lg w-full text-xl cursor-pointer hover:bg-sky-400 transition-all"
        />
      </form>
    </div>
  );
};

export default CreateEvent;
