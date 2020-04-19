import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      videos: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie"),
      path: null,
      url: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
        path,
        url,
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    this.setState({ path, url });
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let videos = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
        const {
          data: { results },
        } = await movieApi.getVideo(parsedId);
        videos = results;
      } else {
        ({ data: result } = await tvApi.tvDetail(parsedId));
        const {
          data: { results },
        } = await tvApi.getVideo(parsedId);
        videos = results;
      }
    } catch (err) {
      console.log(err);
      this.setState({ error: "Can't find Detail" });
    } finally {
      this.setState({ loading: false, result, videos });
    }
  }
  render() {
    const { result, error, loading, path, url, videos } = this.state;
    return (
      <>
        <DetailPresenter
          result={result}
          error={error}
          loading={loading}
          path={path}
          url={url}
          videos={videos}
        />
      </>
    );
  }
}
