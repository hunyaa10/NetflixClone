import React, { createContext, useContext, useState, ReactNode } from "react";
import { IMovie } from "../api";

interface LikedMoviesContextType {
  likedMovies: IMovie[];
  addLikedMovie: (movie: IMovie) => void;
}

const LikedMoviesContext = createContext<LikedMoviesContextType | undefined>(
  undefined
);

export const LikedMoviesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [likedMovies, setLikedMovies] = useState<IMovie[]>([]);

  const addLikedMovie = (movie: IMovie) => {
    setLikedMovies((prev) => {
      if (!prev.some((likedMovie) => likedMovie.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  return (
    <LikedMoviesContext.Provider value={{ likedMovies, addLikedMovie }}>
      {children}
    </LikedMoviesContext.Provider>
  );
};

export const useLikedMovies = () => {
  const context = useContext(LikedMoviesContext);
  if (!context) {
    throw new Error("useLikedMovies must be used within a LikedMoviesProvider");
  }
  return context;
};
