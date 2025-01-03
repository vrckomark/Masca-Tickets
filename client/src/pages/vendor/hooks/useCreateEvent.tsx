import { FormEvent, useState } from "react";
import { DateTime } from "../../../types/DateTime";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/userSlice";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../util/fetch/createEvent";

export const useCreateEvent = () => {
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
  const { isVendor } = useAppSelector(selectUser);
  const { address } = useAccount();
  const navigate = useNavigate();

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

    if (!eventName || !location || !totalTickets || !address) return;
    const response = await createEvent(
      eventName,
      description,
      date,
      location,
      totalTickets,
      address
    );
    if (!response.isError) {
      navigate("/vendor");
    }
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
    const value = e.currentTarget.value;
    setTotalTickets(value ? parseInt(value) : 0);
  };

  const onDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  return {
    isVendor,
    handleSubmit,
    eventName: { value: eventName, onChange: onEventNameChange },
    description: { value: description, onChange: onDescriptionChange },
    dateTime: { ...dateTime, onChange: onDateTimeChange },
    location: { value: location, onChange: onLocationChange },
    totalTickets: { value: totalTickets, onChange: onTotalTicketsChange },
  };
};
