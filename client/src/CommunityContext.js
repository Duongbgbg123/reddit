import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const CommunityContext = createContext({});

export function CommunityContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [community, setCommunity] = useState();
  const [communityInfo, setCommunityInfo] = useState({});
  useEffect(() => {
    if (!community) {
      setCommunityInfo({});
      return;
    }
    axios.get(`/communities/${community}`).then((response) => {
      setCommunityInfo(response.data);
    });
  }, [community]);

  return (
    <CommunityContext.Provider
      value={{ show, setShow, community, setCommunity, ...communityInfo }}
    >
      {children}
    </CommunityContext.Provider>
  );
}
