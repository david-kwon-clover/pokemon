import React from "react";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
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

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  open,
  handleClose,
  id,
}) => {
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
      </Dialog>
    </section>
  );
};

export default PokemonDetails;
