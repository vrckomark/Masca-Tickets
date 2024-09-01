import { useEffect, useState } from "react";
import { useMasca } from "../hooks/useMasca";

const Home = () => {
  const { mascaApi } = useMasca();
  const [credentials, setCredentials] = useState<object[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mascaApi || (credentials && credentials.length)) return;
    const getCredentials = async () => {
      setIsLoading(true);
      const credentials = await mascaApi.queryCredentials({
        options: { returnStore: true },
      });
      if (credentials.success) {
        setCredentials(credentials.data);
        setIsLoading(false);
      }
    };
    getCredentials();
  }, [mascaApi]);

  console.log(credentials);

  return (
    <div className="p-8 text-xl">
      {isLoading ? (
        <p>loading...</p>
      ) : credentials && !credentials.length ? (
        <p>No credentials found.</p>
      ) : credentials && credentials.length ? (
        <div className="text-wrap">
          {credentials.map((vc) => (
            <div>{JSON.stringify(vc)}</div>
          ))}
        </div>
      ) : (
        <p className="text-xl">
          Connect wallet and accept to view your credentials.
        </p>
      )}
    </div>
  );
};

export default Home;
