import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../../api";
import styled from "styled-components";

const Big = styled.div`
  font-size: 2em;
  margin: 1em;
`;

export default ({
  match: {
    params: { id },
  },
  location: { pathname },
}) => {
  const [Country, setCountry] = useState([]);

  useEffect(() => {
    const GetProduction = async () => {
      if (pathname.includes("/movie")) {
        const production = await movieApi.movieDetail(id);
        const {
          data: { production_countries },
        } = production;
        console.log(production_countries);
        setCountry(production_countries);
      } else {
        const production = await tvApi.tvDetail(id);
        const {
          data: { production_countries },
        } = production;
        setCountry(production_countries);
      }
    };
    GetProduction();
  }, [id, pathname]);

  if (Country !== undefined) {
    return (
      <>
        {Country.map((e) => (
          <Big key={e.name}>{e.name}</Big>
        ))}
      </>
    );
  }
  return (
    <>
      <Big>No info</Big>
    </>
  );
};
