import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { getEventsByVendor } from "../util/fetch/getEventsByVendor";
import TextBox from "../components/TextBox";
import { useAccount } from "wagmi";

const Vendor = () => {
  const [events, setEvents] = useState<object[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!address) return;
      const data = await getEventsByVendor(address);
      setEvents(
        data.map((event: any) => {
          return {
            ...event,
            date: isNaN(event.date) ? null : event.date,
          };
        })
      );
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-8 text-xl flex flex-col gap-12">
      <div className="flex flex-wrap gap-8">
        {events.length &&
          events.map((event: any, i: number) => (
            <div
              className="flex flex-col p-4 gap-2 rounded-lg bg-white bg-opacity-5 w-max"
              key={i}
            >
              <div className="flex gap-6 items-center">
                <h2>{event.name}</h2>
                <TextBox
                  label={`Tickets left ${event.availableTickets}`}
                  customStyle="font-medium py-2"
                />
              </div>
              <pre
                style={{ fontFamily: "Inter Tight , system-ui" }}
                className="text-lg opacity-60 mt-6 "
              >
                {event.description}
              </pre>
              {event.date && (
                <div className="flex gap-4 mt-4">
                  <TextBox label={event.date.toDateString()} />
                  <TextBox
                    label={`${event.date.getHours()}:${
                      event.date.getMinutes() == 0
                        ? "00"
                        : event.date.getMinutes()
                    }`}
                  />
                </div>
              )}
              {event.location && (
                <TextBox label={event.location} customStyle="mt-4" />
              )}
              {event.id && (
                <div className="p-4 bg-white rounded-lg flex justify-center">
                  <QRCode value={JSON.stringify(event.id)} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Vendor;
