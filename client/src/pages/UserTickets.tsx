import { useContext, useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import UsedTicketCard from "../components/UsedTicketCard";
import { CircularProgress } from "@mui/material";
import { useAccount } from "wagmi";
import { verifyTicket } from "../util/fetch/verifyTicket";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser, setTickets } from "../store/userSlice";
import { TicketReturnType, TicketType } from "../types/Ticket";
import { MascaContext } from "../components/providers/MascaApiProvider";

const UserTickets = () => {
  const { currentDID, tickets } = useAppSelector(selectUser);
  const { mascaApi } = useContext(MascaContext);
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const dispatch = useAppDispatch();

  const getVerifiedTickets = async (credentials: any[]) => {
    const copyTickets: TicketType[] = [];
    for (const vc of credentials) {
      if (vc.credentialSubject.id !== currentDID) continue;

      try {
        const verifyData = await verifyTicket(vc);

        if (
          !verifyData ||
          verifyData.result == null ||
          !verifyData.result.verified
        ) {
          console.log(`Error verifying VC`);
          continue;
        }

        copyTickets.push({
          ...(vc.credentialSubject as TicketReturnType),
          isUsed: verifyData.result.isUsed,
          type: vc.type?.[1] || "Unknown Event",
        });
      } catch (error) {
        console.log(`Error verifying VC:${JSON.stringify(vc)}`, error);
      }
    }
    return copyTickets;
  };

  useEffect(() => {
    const fetchVCs = async () => {
      if (!mascaApi || !currentDID || !address || tickets.length) return;
      setIsLoading(true);
      setVerifying(true);

      try {
        const credentials = await mascaApi.queryCredentials();

        if (!credentials.success)
          return console.error("Failed to query VCs:", credentials);

        const verifiedVCs = await getVerifiedTickets(
          credentials.data.map((vc) => vc.data)
        );

        dispatch(setTickets(verifiedVCs));
      } catch (error) {
        console.error("Error querying credentials:", error);
      } finally {
        setIsLoading(false);
        setVerifying(false);
      }
    };

    fetchVCs();
  }, [mascaApi, address, currentDID]);

  return (
    <div className="p-8 text-xl">
      {isLoading || (verifying && !tickets.length) ? (
        <CircularProgress size={20} color="inherit" />
      ) : !tickets.length ? (
        <p>No valid credentials found.</p>
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-semibold">Unused Tickets</h2>
          <div className="text-wrap">
            {tickets
              .filter((ticket) => !ticket.isUsed)
              .map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
          </div>

          <h2 className="mb-4 text-2xl font-semibold mt-8">Used Tickets</h2>
          <div className="text-wrap">
            {tickets
              .filter((ticket) => ticket.isUsed)
              .map((ticket, index) => (
                <UsedTicketCard key={index} ticket={ticket} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTickets;
