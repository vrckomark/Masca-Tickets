import { EventType } from "../../types/Event";
import EventCard from "./EventCard";
import { useHomePage } from "./useHomePage";

const Home = () => {
  const { events, isWalletReady, isVendor, walletData, successMessage } =
    useHomePage();

  return (
    <div className="p-8 text-xl flex flex-col gap-12">
      <div className="flex flex-wrap gap-8">
        {events.length &&
        events.filter((event) => new Date(event.date) > new Date()) ? (
          events
            .filter((event) => new Date(event.date) > new Date())
            .map((event: EventType, index: number) => (
              <EventCard
                key={index}
                event={event}
                // buyTicket={handleBuyTicket}
                walletData={isWalletReady && !isVendor ? walletData : undefined}
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
