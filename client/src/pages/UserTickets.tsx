import { useEffect, useState } from "react";
import { useMasca } from "../hooks/useMasca";
import TicketCard from "../components/TicketCard";
import UsedTicketCard from "../components/UsedTicketCard";
import { CircularProgress } from "@mui/material";
import { useAccount } from "wagmi";
import { verifyTicket } from "../util/fetch/verifyTicket";

const UserTickets = () => {
  const { mascaApi } = useMasca();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [unusedTickets, setUnusedTickets] = useState<object[]>([]);  // Unused tickets
  const [usedTickets, setUsedTickets] = useState<object[]>([]);      // Used tickets

  useEffect(() => {
    const fetchVCs = async () => {
      if (!mascaApi) return;
      setIsLoading(true);
      try {
        const credentials = await mascaApi.queryCredentials();

        if (credentials.success) {
          const allVCs = credentials.data;

          const verifiedUnused = [];
          const verifiedUsed = [];
          for (const vc of allVCs) {
            const vcToVerify = { credential: vc.data };

            try {
              const verifyData = await verifyTicket(vcToVerify.credential);
              console.log("verifyData: ", verifyData);
              if (verifyData && verifyData.result !== null) {
                if(verifyData.result.verified) {
                  if (verifyData.result.isUsed) {
                    verifiedUsed.push(vcToVerify);
                    console.log("verifiedUsed",verifiedUsed);
                  } else {
                    verifiedUnused.push(vcToVerify);
                  }
                }
              }
            } catch (err) {
              console.error(`Error verifying VC ${vc}:`, err);
            }
          }

          console.log("unused:", verifiedUnused);
          console.log("used:", verifiedUsed);
          setUnusedTickets(verifiedUnused);
          setUsedTickets(verifiedUsed);
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
      fetchVCs();
    }
  }, [mascaApi, address]);

  return (
    <div className="p-8 text-xl">
      {isLoading ? (
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
