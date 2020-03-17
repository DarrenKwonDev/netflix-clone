import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  error,
  searchTerm,
  handleSubmmit
}) => null;

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  handleSubmmit: PropTypes.func.isRequired
};

export default SearchPresenter;
