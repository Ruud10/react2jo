import React, { useState, useEffect } from "react";
import axios from "axios";

const FestivalPage = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const apiKey = "KQM2A5C9L5RvGwpDcXQv5wtEijp0j9vQIrFFSO2El1eZeSD3rnezIEKaWrg9hTRwrx4Zeg4V1Tguhm%2BmpTCTXA%3D%3D";
        const url = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?numOfRows=10&pageNo=1&MobileOS=WIN&MobileApp=Festival&_type=json&listYN=N&arrange=A&mapX=127&mapY=36&radius=20000&contentTypeId=15&modifiedtime=20240418&serviceKey=${apiKey}`;

        const response = await axios.get(url);

        const { data } = response;
        const { response: { body: { items: { item } } } } = data;

        console.log("Festivals data:", item);

        if (item) {
          setFestivals(Array.isArray(item) ? item : [item]);
        } else {
          setError("No festivals found");
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch festivals");
        setLoading(false);
      }
    };

    fetchFestivals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <h1>Festival List</h1>
      <ul>
        <li>
          <pre>{JSON.stringify(festivals, null, 2)}</pre>
        </li>
      </ul>
    </div>
  );
};

export default FestivalPage;
