import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../../api";
import styled from "styled-components";

const Img = styled.img`
  width: 5em;
`;

const BoardWrapper = styled.div`
  background-color: rgba(125, 125, 125, 0.7);
  padding: 1em;
  border-radius: 15px;
`;

const Board = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 65px;
  margin-bottom: 3px;
`;

const Big = styled.div`
  font-size: 2em;
  margin: 1em;
`;

const NoImage = styled.div`
  width: 5em;
`;

export default ({
  match: {
    params: { id },
  },
  location: { pathname },
}) => {
  const [Company, setCompany] = useState([]);

  useEffect(() => {
    const GetProduction = async () => {
      if (pathname.includes("/movie")) {
        const production = await movieApi.movieDetail(id);
        const {
          data: { production_companies },
        } = production;
        setCompany(production_companies);
      } else {
        const production = await tvApi.tvDetail(id);
        const {
          data: { production_companies },
        } = production;
        setCompany(production_companies);
      }
    };
    GetProduction();
  }, [id, pathname]);

  if (Company !== undefined) {
    return (
      <>
        <BoardWrapper>
          {Company.map((e) => {
            if (e.logo_path !== null) {
              return (
                <Board key={e.id}>
                  <span>
                    <Img
                      src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                      alt="company"
                    ></Img>
                  </span>
                  <Big>{e.name}</Big>
                </Board>
              );
            } else {
              return (
                <Board key={e.id}>
                  <span>
                    <NoImage>No image</NoImage>
                  </span>
                  <Big>{e.name}</Big>
                </Board>
              );
            }
          })}
        </BoardWrapper>
      </>
    );
  }
  return <div>No info</div>;
};
