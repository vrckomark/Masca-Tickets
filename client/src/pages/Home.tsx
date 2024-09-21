import { useContext, useEffect, useState } from "react";
import { getEvents } from "../util/fetch/getEvents";
import TextBox from "../components/TextBox";
import { useAccount } from "wagmi";
import { createTicket } from "../util/fetch/createTicket";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/userSlice";
import { Address } from "viem";
import { MascaContext } from "../components/providers/MascaAPIProvider";

const Home = () => {
  const [events, setEvents] = useState<object[]>([]);
  const { currentDID } = useAppSelector(selectUser);
  const { mascaApi } = useContext(MascaContext);
  const { address } = useAccount();
  const [loading, setLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleBuyTicket = async (eventId: string, alias: Address) => {
    if (!address) {
      alert("Please connect your wallet to buy tickets.");
      return;
    }
    if (!mascaApi || !currentDID) {
      alert(
        "Unable to buy ticket. Please ensure you're connected to our DAPP."
      );
      return;
    }

    try {
      setLoading(eventId);

      console.log("Buying ticket for event:", eventId);
      const response = await createTicket(eventId, address, alias, currentDID);

      console.log("Ticket purchase response:", response);

      if (
        response.status >= 200 &&
        response.status < 300 &&
        response.verifiableCredential
      ) {
        // Save the VC to MetaMask Snap Masca
        const saveResult = await mascaApi.saveCredential(
          response.verifiableCredential,
          {
            store: ["ceramic", "snap"],
          }
        );

        if (saveResult) {
          console.log("Ticket purchased and saved to Masca!");
          setSuccessMessage(
            "Ticket successfully purchased and saved to Masca!"
          );
          setTimeout(() => setSuccessMessage(null), 3000);
        }
      } else {
        throw new Error(`Failed to purchase ticket: ${response.message}`);
      }
    } catch (error) {
      console.error("Error buying ticket:", error);
      alert("Failed to purchase ticket.");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
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
              <button
                onClick={() => handleBuyTicket(event.id, event.vendor.wallet)}
                className="bg-sky-500 hover:bg-sky-400  text-white px-4 py-2 mt-4 rounded-lg button-hover"
                value={event.id}
                name="eventId"
              >
                {loading === event.id ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Buy Ticket"
                )}
              </button>
            </div>
          ))}
      </div>
      {/* Success Popup */}
      {successMessage && (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Home;
