import { useEffect, useState } from "react";
import { useMasca } from "../hooks/useMasca";
import TicketCard from "../components/TicketCard";
import { CircularProgress } from "@mui/material";
import { getTicketsByWallet } from "../util/fetch/getTicketsByWallet";
import { useAccount } from "wagmi";

const UserTickets = () => {
  const { mascaApi } = useMasca();
  const { address } = useAccount();
  const [VCs, setVCs] = useState<object[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTicketsFromDB = async () => {
      if (!address) return;
      try {
        const dbTickets = await getTicketsByWallet(address);
        setTickets(dbTickets);
      } catch (error) {
        console.error("Error fetching tickets from the database:", error);
      }
    };

    const fetchVCs = async () => {
      if (!mascaApi) return;
      setIsLoading(true);
      try {
        const credentials = await mascaApi.queryCredentials();

        console.log("credentials:", credentials);

        if (credentials.success) {
          setVCs(credentials.data);
        } else {
          console.error("Failed to query VCs:", credentials);
        }
      } catch (error) {
        console.error("Error querying credentials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      fetchTicketsFromDB();
      fetchVCs();
    }
  }, [mascaApi]);

  const filteredVCs = VCs?.filter((vc) => {
    const { credentialSubject } = vc.data;
    return tickets.some((ticket) => ticket.ticketId === credentialSubject?.ticketID);
  });

  const usedVCs = filteredVCs?.filter((vc) => {
    const { credentialSubject } = vc.data;
    const relatedTicket = tickets.find((ticket) => ticket.ticketId === credentialSubject?.ticketID);
    return relatedTicket?.isUsed === true;
  });

  const unusedVCs = filteredVCs?.filter((vc) => {
    const { credentialSubject } = vc.data;
    const relatedTicket = tickets.find((ticket) => ticket.ticketId === credentialSubject?.ticketID);
    return relatedTicket?.isUsed === false;
  });


  return (
    <div className="p-8 text-xl">
      {isLoading ? (
        <CircularProgress size={20} color="inherit" />
      ) : !VCs?.length ? (
        <p>No credentials found.</p>
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-semibold">Unused Tickets</h2>
          <div className="text-wrap">
            {unusedVCs?.map((vc, index) => (
              <TicketCard key={index} vc={vc} />
            ))}
          </div>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">Used Tickets</h2>
          <div className="text-wrap">
            {usedVCs?.map((vc, index) => (
              <TicketCard key={index} vc={vc} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTickets;
