import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Avatar,
  Divider,
  Fab,
} from "@mui/material";
import PropTypes from "prop-types";
import { loginUser, logoutUser } from "../actions/authAction";
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "./LoadingScreen";
import AddTodoModal from "./AddTodoModal";

function Home(props) {
  const { data, setData, loading, error } = useFetch("/api/todos");

  const [Todos, setTodos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTodoToState = (newData) => {
    setTodos((oldData) => [newData, ...oldData]);
  };

  useEffect(() => {
    if (data?.data?.data) {
      setTodos(data.data.data);
    }
  }, [data]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              props.logoutUser();
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container
            maxWidth="md"
            sx={{
              mt: "4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom:"2rem"
            }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {Todos.map((todo) => {
                return (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${todo.title}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {todo.description}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                );
              })}
            </List>
          </Container>
          <Fab
            onClick={() => {
              handleOpen();
            }}
            sx={{ position: "fixed", bottom: 10, right: 10 }}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <AddTodoModal
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            addTodoToState={addTodoToState}
          />
        </>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Home);
