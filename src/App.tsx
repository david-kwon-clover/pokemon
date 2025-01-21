import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";



type Pokemon = {
  name: string;
  url: string;
};

type PokemonDetails = {
  types: Array<{ slot: number, type: { name: string, url: string } }>;
};

function App() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [error, setError] = useState("")

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
      const detailedResponses = await Promise.all(allPokemon.map((pokemon: Pokemon) => fetch(pokemon.url)));
      const detailedData: PokemonDetails[] = await Promise.all(detailedResponses.map((response) => response.json()));
      setPokemonDetails(detailedData);
    } catch (error) {
      error instanceof Error && setError(error.message);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <main>
      <h1>Browse the Original 151 Pokemon</h1>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {allPokemon.map((pokemon: Pokemon, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
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
                      index + 1
                    }.png`}
                  />
                  <CardContent component="div" sx={{ height: "50%" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {pokemon.name.replace(
                        pokemon.name[0],
                        pokemon.name[0].toUpperCase()
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Type(s): {pokemonDetails[index]?.types.map((type) => type.type.name).join(", ")}
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
