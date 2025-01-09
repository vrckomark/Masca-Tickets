import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { EventType } from "../../../types/Event";
import { getEventsByVendor } from "../../../util/fetch/getEventsByVendor";

export const useVendorEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!address) return;
      const data = await getEventsByVendor(address);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return {
    events,
  };
};
