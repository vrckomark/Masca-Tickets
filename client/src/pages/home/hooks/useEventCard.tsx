import { useContext, useEffect, useState } from "react";
import { Address } from "viem";
import BuyTicketModal from "../../../components/ui/BuyTicketModal";
import { ModalContext } from "../../../contexts/ModalContextProvider";
import { EventType } from "../../../types/Event";

export const useEventCard = ({
  event,
  walletData,
}: {
  event: EventType;
  walletData?: {
    address: Address;
    currentDID: string;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [qrLocation, setQrLocation] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const { openModal } = useContext(ModalContext);

  const handleBuyTicket = async () => {
    if (!walletData) return;
    setIsLoading(true);

    try {
      const payload = {
        credential_type: ["VerifiableCredential", "EventTicketCredential"],
        credential_subject: {
          eventId: event.id,
          eventName: event.name,
        },
      };

      console.log(payload);

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "x-api-key",
        "NjEwOWNiMjQtOWZiNS00MDlmLWE2MmQtYzc2MWY4ZGVkMjFm"
      );

      const response = await fetch(
        "http://142.132.224.126:3001/oidc/create-credential-offer",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const decodedLocation = decodeURIComponent(data.location);
        setQrLocation(decodedLocation);
        setPin(data.pin);
        console.log(decodedLocation);
      } else {
        throw new Error("Failed to fetch credential offer.");
      }
    } catch (error) {
      console.error("Error buying ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!pin || !qrLocation) return;
    openModal(<BuyTicketModal pin={pin} qrLocation={qrLocation} />);
  }, [qrLocation, pin]);

  return { handleBuyTicket, isLoading };
};
