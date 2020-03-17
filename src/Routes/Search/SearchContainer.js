import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "../../api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: true
  };

  handleSubmmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  searchByTerm = async () => {
    this.setState({ loading: true });
    const { searchTerm } = this.state;
    try {
      const {
        data: { results: movieResults }
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.search(searchTerm);
      this.setState({ movieResults, tvResults });
    } catch (err) {
      console.log(err);
      this.setState({ error: "you mad?" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    console.log(this.state);
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSubmmit={this.handleSubmmit}
      />
    );
  }
}
