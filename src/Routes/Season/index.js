import React, { useEffect, useState } from "react";
import { tvApi } from "../../api";
import styled from "styled-components";

const Big = styled.div`
  font-size: 2em;
  margin: 1em;
`;
const BoardWrapper = styled.div`
  background-color: rgba(125, 125, 125, 0.7);
  padding: 1em;
  border-radius: 15px;
`;
const Img = styled.img`
  width: 4em;
`;
const Wrapper = styled.div`
  display: inline-block;
  margin: 0 0.5em;
`;
export default ({
  match: {
    params: { id },
  },
}) => {
  const [Season, setSeason] = useState([]);

  useEffect(() => {
    const GetProduction = async () => {
      const production = await tvApi.tvDetail(id);
      const {
        data: { seasons },
      } = production;
      setSeason(seasons);
      console.log(seasons);
    };
    GetProduction();
  }, [id]);

  if (Season !== undefined) {
    return (
      <BoardWrapper>
        <Big>
          {Season.map((e) => {
            if (
              e.name !== null &&
              e.name !== undefined &&
              e.poster_path !== null &&
              e.poster_path !== undefined
            ) {
              return (
                <Wrapper key={e.name}>
                  <Img
                    src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                    alt="season"
                  ></Img>
                  <div>{e.name}</div>
                </Wrapper>
              );
            }
            return null;
          })}
        </Big>
      </BoardWrapper>
    );
  }
};
