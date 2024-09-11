import { useEffect, useState } from "react";
import { useMasca } from "../hooks/useMasca";
import TicketCard from "../components/TicketCard";
import { CircularProgress } from "@mui/material";
import { useAccount } from "wagmi";
import { verifyTicket } from "../util/fetch/verifyTicket";

const UserTickets = () => {
  const { mascaApi } = useMasca();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedTickets, setVerifiedTickets] = useState<object[]>([]);

  useEffect(() => {
    const fetchVCs = async () => {
      if (!mascaApi) return;
      setIsLoading(true);
      try {
        const credentials = await mascaApi.queryCredentials();

        if (credentials.success) {
          const allVCs = credentials.data;

          const verified = [];
          for (const vc of allVCs) {
            const vcToVerify = { credential: vc.data };

            console.log("vcToVerify ", vcToVerify.credential);

            try {
              const verifyData = await verifyTicket(vcToVerify.credential);
              if (verifyData.result) {
                console.log("Verify Resoult: ", vcToVerify.credential);
                verified.push(vcToVerify);
              }
            } catch (err) {
              console.error(`Error verifying VC ${vc}:`, err);
            }
          }

          console.log(verified);
          setVerifiedTickets(verified);
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
      ) : !verifiedTickets.length ? (
        <p>No valid credentials found.</p>
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-semibold">Verified Tickets</h2>
          <div className="text-wrap">
            {verifiedTickets.map((vc, index) => (
              <TicketCard key={index} vc={vc} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTickets;
