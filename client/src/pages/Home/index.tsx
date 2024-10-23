import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { EventType } from "../../types/Event";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/userSlice";
import { MascaContext } from "../../components/providers/MascaApiProvider";
import { createTicket } from "../../util/fetch/createTicket";
import { getEvents } from "../../util/fetch/getEvents";
import EventCard from "./EventCard";

const Home = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const { currentDID, isVendor } = useAppSelector(selectUser);
  const { mascaApi } = useContext(MascaContext);
  const { address } = useAccount();
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
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      if (!data?.length) return;
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const isWalletReady = address && currentDID && mascaApi;

  return (
    <div className="p-8 text-xl flex flex-col gap-12">
      <div className="flex flex-wrap gap-8">
        {events.length && events.filter((event) => new Date(event.date) > new Date()) ? (
          events
            .filter((event) => new Date(event.date)  > new Date())
            .map((event: EventType, index: number) => (
              <EventCard
                key={index}
                event={event}
                buyTicket={handleBuyTicket}
                walletData={
                  isWalletReady && !isVendor
                    ? { address, currentDID, mascaApi }
                    : undefined
                }
              />
            ))
        ) : (
          <></>
        )}
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
