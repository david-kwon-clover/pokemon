import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Grid from "@mui/material/Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

type Pokemon = {
  name: string;
  url: string;
};

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [error, setError] = useState("");

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      if (!response.ok) {
        throw new Error(
          "There was an issue retrieving Pokemon data. Try again later"
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

  return (
    <main>
      <h1>Browse the Original 151 Pokemon</h1>
      {error && <h2>{error}</h2>}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {allPokemon.map((pokemon: Pokemon, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: 'contain' }}
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
                    index + 1
                  }.png`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pokemon.name.replace(
                      pokemon.name[0],
                      pokemon.name[0].toUpperCase()
                    )}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Description
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </main>
  );
}

export default App;
