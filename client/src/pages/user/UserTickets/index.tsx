import { CircularProgress } from "@mui/material";
import { useUserTickets } from "./useUserTickets";
import TicketCard from "../../../components/TicketCard";

const UserTickets = () => {
  const { handleRefresh, isLoading, isVerifying, tickets } = useUserTickets();
  return (
    <div className="p-8 text-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">My Tickets</h2>
        <button
          className="bg-secondary flex justify-center items-center text-[#fee9dd] px-4 py-2  font-semibold rounded-lg hover:bg-opacity-90 transition-all"
          onClick={handleRefresh}
          disabled={isLoading || isVerifying}
        >
          {isLoading || isVerifying ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      {isLoading || (isVerifying && !tickets.length) ? (
        <CircularProgress size={20} color="inherit" />
      ) : !tickets.length ? (
        <p className="font-medium">No valid credentials found.</p>
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-semibold">Unused Tickets</h2>
          <div className="text-wrap gap-6 flex flex-wrap">
            {tickets
              .filter((ticket) => !ticket.isUsed)
              .map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
          </div>

          {tickets.some((ticket) => ticket.isUsed) && (
            <>
              <h2 className="mb-4 text-2xl font-semibold mt-8">Used Tickets</h2>
              <div className="text-wrap gap-6 flex flex-wrap">
                {tickets
                  .filter((ticket) => ticket.isUsed)
                  .map((ticket, index) => (
                    <TicketCard key={index} ticket={ticket} />
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserTickets;
