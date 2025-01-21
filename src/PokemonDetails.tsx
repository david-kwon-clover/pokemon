import React, { useEffect, useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  CircularProgress,
  Box,
  Chip,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PokemonDetailsProps = {
  open: boolean;
  handleClose: () => void;
  id: string | null;
};

type PokemonDetails = {
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  open,
  handleClose,
  id,
}) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPokemonDetails = async (id: string | null): Promise<void> => {
    try {
      const response: Response = await fetch(`${baseUrl}${id}`);
      if (!response.ok) {
        setError(
          "There was an issue retrieving Pokemon data. Try again later."
        );
        throw new Error(
          "There was an issue retrieving Pokemon data. Try again later."
        );
      }
      const data: PokemonDetails = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      error instanceof Error && setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (open) {
      fetchPokemonDetails(id);
    }
  }, [open]);

  return (
    <section>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundColor: "#242424",
          },
        }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "red" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {error && (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        )}
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress />
          </Box>
        )}
        {pokemonDetails && (
          <Container maxWidth="xl" sx={{ mt: 4 }} >
            <Card>
              <CardContent sx={{ backgroundColor: "#f5f5f5" }}>
                <Typography variant="h4" align="center" gutterBottom>
                  {pokemonDetails.name.charAt(0).toUpperCase() +
                    pokemonDetails.name.slice(1)}
                </Typography>
                <Box display="flex" justifyContent="center" mb={2}>
                  <img
                    src={
                      pokemonDetails.sprites.other["official-artwork"]
                        .front_default
                    }
                    alt={pokemonDetails.name}
                    style={{ width: "150px", height: "150px" }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Types:
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  {pokemonDetails.types.map((type) => (
                    <Chip
                      key={type.type.name}
                      label={type.type.name}
                      color="primary"
                    />
                  ))}
                </Box>
                <Typography variant="h6" gutterBottom>
                  Abilities:
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  {pokemonDetails.abilities.map((ability) => (
                    <Chip
                      key={ability.ability.name}
                      label={ability.ability.name}
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="h6" gutterBottom>
                  Stats:
                </Typography>
                <Grid container spacing={2}>
                  {pokemonDetails.stats.map((stat) => (
                    <Grid key={stat.stat.name}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>{stat.stat.name.toUpperCase()}</Typography>
                        <Typography>{stat.base_stat}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Container>
        )}
      </Dialog>
    </section>
  );
};

export default PokemonDetails;
