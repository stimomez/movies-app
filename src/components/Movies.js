import axios from "axios";
import React, { useEffect, useState } from "react";
import NotResult from "./NotResult";

const MovieList = ({ urlAPI, apiKey }) => {
  const [movieList, setMovieList] = useState({});
  const [movieTitle, setMovieTitle] = useState("");
  const [thereAreResults, setThereAreResults] = useState(false);

  useEffect(() => {
    request();
  }, []);
  if (movieTitle === "") {
    setMovieTitle("Fast& Furious");
  }

  const request = () => {
    axios
      .get(`${urlAPI + apiKey}&s=${movieTitle}`)
      .then((res) => setMovieList(res.data));
  };
  useEffect(() => {
    if (movieList.Error) {
      setThereAreResults(true);

      setTimeout(() => {
        setThereAreResults(false);
        setMovieTitle("Fast& Furious");
        request();
      }, 1000);
    }
  }, [movieList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    request();
  };
  const titleName = (e) => {
    setMovieTitle(e.target.value);
  };
  return (
    <div>
      <div className="container-sm p-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Fast & Furious"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={titleName}
          />
          <input
            className="mt-1 fs-3 text-uppercase rounded bottom"
            type="submit"
            value="search"
          />
        </form>
      </div>
      {thereAreResults ? (
        <NotResult />
      ) : (
        <div
          className=" container p-3 "
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))",
            gap: "30px",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {movieList.Search?.map((movie) => (
            <div
              className="shadow  bg-body rounded"
              key={movie.imdbID}
              style={{ height: "530px" }}
            >
              <div style={{ height: "400px" }}>
                <img
                  src={movie.Poster}
                  style={{ width: "100%", height: "100%", objectFit: "fill" }}
                  className="card-img-top rounded-top"
                  alt="..."
                />
                <div className="card-body p-1 ">
                  <h5 className="card-title text-uppercase text-center">
                    {movie.Title}
                  </h5>
                  <div className="d-flex justify-content-between border-bottom">
                    <span className="mx-2">Type </span>
                    <strong className="text-uppercase mx-2">
                      {" "}
                      {movie.Type}
                    </strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom">
                    <span className="mx-2">Year</span>
                    <strong className="text-uppercase mx-2 ">
                      {" "}
                      {movie.Year}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
