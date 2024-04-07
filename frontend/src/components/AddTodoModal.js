import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth < 800 ? "70%" : 300,
  width: "70%",
  "@media (min-width: 600px)": {
    width: 300,
  },
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export default function AddTodoModal(props) {
  const { open, setOpen, handleOpen, handleClose, addTodoToState } = props;
  const [title, settitle] = useState("");
  const [description, setdescription] = React.useState("");
  const [loading, setloading] = useState(false);

  const saveTodo = async () => {
    setloading(true);
    try {
      const response = await axios.post("/api/todos", { title, description });
      console.log(response);
      addTodoToState(response.data.data);
      handleClose();
      setloading(false);
      settitle("");
      setdescription("");
    } catch (e) {
      alert("something went worng try again");
      setloading(false);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Todo
          </Typography>
          <TextField
            fullWidth
            sx={{ mt: "1rem", borderRadius: "15px" }}
            size="small"
            variant="outlined"
            value={title}
            label="Title"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <br />
          <TextField
            fullWidth
            sx={{ mt: "1rem", borderRadius: "15px" }}
            size="small"
            variant="outlined"
            value={description}
            label="Description"
            multiline
            rows={3}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <br />
          {loading ? (
            <Button
              sx={{
                mt: "1rem",
                borderRadius: "5px",
                fontSize: "16px",
                textTransform: "none",
              }}
              variant="contained"
              fullWidth
              disabled
              endIcon={<CircularProgress size={18} />}
            >
              Loading
            </Button>
          ) : (
            <Button
              sx={{ mt: "1rem", borderRadius: "5px" }}
              variant="contained"
              fullWidth
              onClick={() => {
                saveTodo();
              }}
            >
              SAVE
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
}
