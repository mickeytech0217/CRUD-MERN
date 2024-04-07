import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Container,
} from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authAction";
import { withRouter } from "react-router";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stateErrors, setStateErros] = useState({});
    const errors = props.errors;
    useEffect(() => {
        setStateErros(errors);
    }, [errors]);

    useEffect(() => {
        setStateErros({});
    }, []);

    if (props.auth.isAuthenticated) {
        props.history.push("/home");
    }

    const loading = props.auth.loading;
    const onChange = (e) => {
        switch (e.target.name) {
            case "email": {
                setEmail(e.target.value);
                break;
            }
            case "password": {
                setPassword(e.target.value);
                break;
            }
            default: {
                break;
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const User = {
            email: email,
            password: password,
        };
        props.loginUser(User);
    };

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            style={{
                paddingBottom: "1rem",
                //  marginTop: "4.5rem"
                width: "100%",
            }}
        // spacing={2}
        >
            <Grid item xs={12}>
                <Typography align="center" color="secondary" variant="h2">
                    Login
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    align="center"
                    display="block"
                    color="secondary"
                    variant="overline"
                >
                    Login to Your account
                </Typography>
            </Grid>
            <form onSubmit={onSubmit} style={{ width: "100%" }}>
                <Container maxWidth="xs">
                    <Grid item xs={12}>
                        {stateErrors.email ? (
                            <TextField
                                fullWidth
                                color="secondary"
                                error
                                style={{ marginBottom: "1rem" }}
                                variant="outlined"
                                name="email"
                                label="Email address"
                                InputLabelProps={{
                                    style: { color: "#c7c4c0" },
                                }}
                                type="email"
                                helperText={errors.email}
                                value={email}
                                onChange={onChange}
                            ></TextField>
                        ) : (
                            <TextField
                                fullWidth
                                // style={{ border: "1px solid" }}
                                color="secondary"
                                style={{ marginBottom: "1rem" }}
                                InputLabelProps={{
                                    style: { color: "#c7c4c0" },
                                }}
                                variant="outlined"
                                name="email"
                                label="Email address"
                                type="email"
                                helperText="use gravatar email for profile pic"
                                value={email}
                                onChange={onChange}
                            ></TextField>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {stateErrors.password ? (
                            <TextField
                                fullWidth
                                color="secondary"
                                error
                                style={{ marginBottom: "1rem" }}
                                variant="outlined"
                                name="password"
                                InputLabelProps={{
                                    style: { color: "#c7c4c0" },
                                }}
                                label="Password"
                                type="password"
                                value={password}
                                onChange={onChange}
                                helperText={errors.password}
                            ></TextField>
                        ) : (
                            <TextField
                                fullWidth
                                color="secondary"
                                style={{ marginBottom: "1rem" }}
                                variant="outlined"
                                name="password"
                                InputLabelProps={{
                                    style: { color: "#c7c4c0" },
                                }}
                                label="Password"
                                type="password"
                                value={password}
                                onChange={onChange}
                            ></TextField>
                        )}
                    </Grid>

                    <Grid item xs={12} style={{ marginBottom: "1rem" }}>
                        {loading ? (
                            <Button
                                variant="text"
                                color="primary"
                                fullWidth={true}
                                disabled
                            >
                                <CircularProgress color="secondary" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth={true}
                            >
                                Login
                            </Button>
                        )}
                    </Grid>
                </Container>
            </form>
        </Grid>
    );
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStatetoProps, { loginUser })(withRouter(Login));
