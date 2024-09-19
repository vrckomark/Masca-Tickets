import { useEffect, useState } from "react";
import { useMasca } from "../hooks/useMasca";
import TicketCard from "../components/TicketCard";
import UsedTicketCard from "../components/UsedTicketCard";
import { CircularProgress } from "@mui/material";
import { useAccount } from "wagmi";
import { verifyTicket } from "../util/fetch/verifyTicket";

const UserTickets = () => {
  const { mascaApi, currentDID } = useMasca();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [unusedTickets, setUnusedTickets] = useState<object[]>([]);
  const [usedTickets, setUsedTickets] = useState<object[]>([]);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchVCs = async () => {
      setUnusedTickets([]);
      setUsedTickets([]);

      if (!mascaApi || !currentDID) return;
      setIsLoading(true);
      setVerifying(true);

      try {
        const credentials = await mascaApi.queryCredentials();

        if (credentials.success) {
          const allVCs = credentials.data;

          for (const vc of allVCs) {
            const vcToVerify = { credential: vc.data };

            try {
              if(vcToVerify.credential.credentialSubject.id !== currentDID) {
                continue;
              }

              const verifyData = await verifyTicket(vcToVerify.credential);
              console.log("verifyData: ", verifyData);

              if (verifyData && verifyData.result !== null) {
                if (verifyData.result.verified) {
                  if (verifyData.result.isUsed) {
                    setUsedTickets((prevUsedTickets) => [...prevUsedTickets, vcToVerify]);
                  } else {
                    setUnusedTickets((prevUnusedTickets) => [...prevUnusedTickets, vcToVerify]);
                  }
                }
              }
            } catch (err) {
              console.error(`Error verifying VC ${vc}:`, err);
            }
          }
        } else {
          console.error("Failed to query VCs:", credentials);
        }
      } catch (error) {
        console.error("Error querying credentials:", error);
      } finally {
        setIsLoading(false);
        setVerifying(false);
      }
    };

    if (address) {
      fetchVCs();
    }
  }, [mascaApi, address, currentDID]);

  return (
    <div className="p-8 text-xl">
      {/* Show loader when fetching and verifying credentials */}
      {isLoading || verifying ? (
        <CircularProgress size={20} color="inherit" />
      ) : !unusedTickets.length && !usedTickets.length ? (
        <p>No valid credentials found.</p>
      ) : (
        <>
          {/* Unused Tickets */}
          <h2 className="mb-4 text-2xl font-semibold">Unused Tickets</h2>
          <div className="text-wrap">
            {unusedTickets.map((vc, index) => (
              <TicketCard key={index} vc={vc} />
            ))}
          </div>

          {/* Used Tickets */}
          <h2 className="mb-4 text-2xl font-semibold mt-8">Used Tickets</h2>
          <div className="text-wrap">
            {usedTickets.map((vc, index) => (
              <UsedTicketCard key={index} vc={vc} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTickets;
