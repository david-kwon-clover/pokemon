import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SearchIcon from "@mui/icons-material/Search";
import HeroBackground from "./assets/pikachu-background.jpeg";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  TextField,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  InputAdornment,
} from "@mui/material";

type Pokemon = {
  name: string;
  url: string;
};

function App() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      if (!response.ok) {
        throw new Error(
          "There was an issue retrieving Pokemon data. Try again later."
        );
      }
      const data = await response.json();
      setAllPokemon(data.results);
    } catch (error) {
      error instanceof Error && setError(error.message);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      fetchPokemon();
    }
    setSearchQuery(e.target.value);
    const filteredPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(e.target.value)
    );
    setAllPokemon(filteredPokemon);
  };

  const scrollToPokemon = () => {
    const pokemonSection = document.getElementById("pokemon-section");
    pokemonSection?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <Box
        component={"section"}
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: `radial-gradient(circle, rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url(${HeroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            marginY: "1rem",
          }}
        >
          Browse the Original 151 Pokemon
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "red", width: "20%", height: "10%", fontSize: "large"}} onClick={scrollToPokemon}>Explore</Button>
      </Box>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <Box id="pokemon-section" sx={{ flexGrow: 1, paddingX: "2rem", paddingY: "1rem" }}>
          <TextField
            sx={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              marginY: "1rem",
              width: "30%",
            }}
            placeholder="Search for a Pokemon"
            onChange={handleSearch}
            value={searchQuery}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {allPokemon.map((pokemon: Pokemon, index) => (
              <Grid key={index} size={{ xs: 5, sm: 4, md: 3, lg: 2 }}>
                <Card
                  component="div"
                  sx={{
                    display: "flex-column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: "50%", objectFit: "contain" }}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      pokemon.url.split("/")[6]
                    }.png`}
                  />
                  <CardContent component="div" sx={{ height: "50%" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {pokemon.name.replace(
                        pokemon.name[0],
                        pokemon.name[0].toUpperCase()
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="small">Details</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </main>
  );
}

export default App;
