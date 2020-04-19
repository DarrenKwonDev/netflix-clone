import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Company from "../Company";
import Country from "../Country";
import Helmet from "react-helmet";
import { Link, Route } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 27%;
  background-image: url(${(props) => props.bgImage});
  background-position: center cetner;
  background-size: cover;
  height: 100%;
  border-radius: 15px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const Item = styled.span`
  font-size: 20px;
`;

const Divider = styled.span`
  margin: 0px 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center cetner;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const IMDB = styled.a`
  background-color: #f5c518;
  color: black;
  padding: 2px;
  border-radius: 3px;
  text-align: center;
  vertical-align: center;
  font-weight: 800;
`;

const Trailer = styled.div`
  font-size: 1.3em;
  padding: 0.3em 0;
  &:first-child {
    padding-top: 1.3em;
  }
  &:last-child {
    padding-bottom: 1.3em;
  }
  &:hover {
    opacity: 0.5;
  }
`;

const BTN = styled.button`
  background-color: rgba(125, 125, 125, 0.3);
  padding: 0.5em 1em;
  color: white;
  border: transparent;
  font-size: 1.4em;
  border-radius: 10px;
  cursor: pointer;
  margin: 1em 0;
  &:hover {
    background-color: rgba(125, 125, 125, 0.8);
    transition: background-color 1s;
  }
`;

const DetailPresenter = ({ result, error, loading, path, url, videos }) =>
  loading ? (
    <>
      <Loader />
      <Helmet>
        <title>Loading | Netfilx</title>
      </Helmet>
    </>
  ) : (
    <>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}
          | Netfilx
        </title>
      </Helmet>
      <Container>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
        ></Backdrop>
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original/${result.poster_path}`
                : require("../../assets/noimage.jpg")
            }
          ></Cover>
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.first_air_date
                  ? result.first_air_date.substring(0, 4)
                  : result.release_date.substring(0, 4)}
              </Item>
              <Divider>▫</Divider>
              <Item>
                {typeof result.runtime === "number" || result.runtime === null
                  ? result.runtime
                  : result.episode_run_time[0]}
              </Item>
              <Divider>▫</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genres, index) =>
                    index === result.genres.length - 1
                      ? ` ${genres.name}`
                      : ` ${genres.name} /`
                  )}
              </Item>
              {result.imdb_id ? (
                <>
                  <Divider>▫</Divider>
                  <IMDB href={`https://www.imdb.com/title/${result.imdb_id}`}>
                    IMDb
                  </IMDB>
                </>
              ) : (
                ""
              )}
            </ItemContainer>
            <Overview>{result.overview ? result.overview : null}</Overview>
            <div>
              {videos.map((e) => {
                if (e.site === "YouTube") {
                  return (
                    <Trailer key={e.id}>
                      <a href={`https://www.youtube.com/watch?v=${e.key}`}>
                        <i className="fab fa-youtube"></i> {e.name}
                      </a>
                    </Trailer>
                  );
                }
                return null;
              })}
            </div>
            <div>
              <Link to={`${url}/company`}>
                <BTN>Production companies</BTN>
              </Link>
              <Link to={`${url}/country`}>
                <BTN>Production countries</BTN>
              </Link>
              <Route path={`${path}/company`} component={Company}></Route>
              <Route path={`${path}/country`} component={Country}></Route>
            </div>
          </Data>
        </Content>
      </Container>
    </>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
