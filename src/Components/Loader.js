import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 22px;
  margin-top: 50px;
`;

const Loader = () => (
  <Container>
    <span role="img" aria-label="loading now...">
      🚧 Loading now... 🚧
    </span>
  </Container>
);

export default Loader;
