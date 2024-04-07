import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Card,
    Container,
} from "@mui/material";

import { connect } from "react-redux";
import { registerUser } from "../actions/authAction";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";
import { clearErrors } from "../actions/authAction";

function Register(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setphone] = useState("");
    useEffect(() => {
        props.clearErrors();
    }, []);

    let { errors } = props;
    const onChange = (e) => {
        switch (e.target.name) {
            case "name": {
                setName(e.target.value.toLowerCase());
                break;
            }
            case "email": {
                setEmail(e.target.value);
                break;
            }
            case "password": {
                setPassword(e.target.value);
                break;
            }
            case "password2": {
                setPassword2(e.target.value);
                break;
            }
            case "phone": {
                setphone(e.target.value);
                break;
            }
            default:
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2,
            phone: phone,
        };
        props.registerUser(newUser, props.history);
    };

    if (props.auth.isAuthenticated) {
        props.history.push("/home");
    }
    const loading = props.auth.loading;
    useEffect(() => {
    }, []);
    return (
        <Container maxWidth="xs" style={{ padding: "1rem", marginTop: "1rem" }}>
            <Card>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ paddingBottom: "1rem", marginTop: "0.5rem" }}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Typography
                            align="center"
                            color="secondary"
                            variant="h2"
                        >
                            Sign Up
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            align="center"
                            display="block"
                            color="secondary"
                            variant="overline"
                        >
                            Create a new account
                        </Typography>
                    </Grid>
                    <form onSubmit={onSubmit} style={{ width: "100%", margin: "1rem" }}>
                        <Container maxWidth="xs">
                            <Grid item xs={12}>
                                {errors.name ? (
                                    <TextField
                                        error
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
                                        variant="outlined"
                                        name="name"
                                        label="Username"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
                                        color="secondary"
                                        value={name}
                                        onChange={onChange}
                                        helperText={errors.name}
                                    ></TextField>
                                ) : (
                                    <TextField
                                        color="secondary"
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
                                        variant="outlined"
                                        name="name"
                                        label="Username"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
                                        value={name}
                                        onChange={onChange}
                                    ></TextField>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {errors.email ? (
                                    <TextField
                                        color="secondary"
                                        error
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
                                        variant="outlined"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
                                        name="email"
                                        label="Email address"
                                        type="email"
                                        helperText={errors.email}
                                        value={email}
                                        onChange={onChange}
                                    ></TextField>
                                ) : (
                                    <TextField
                                        color="secondary"
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
                                        variant="outlined"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
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
                                {errors.phone ? (
                                    <TextField
                                        color="secondary"
                                        error
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",

                                        }}
                                        variant="outlined"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
                                        name="phone"
                                        label="Phone Number"
                                        type="number"
                                        helperText={errors.phone}
                                        value={phone}
                                        onChange={onChange}
                                        inputProps={{
                                            maxLength: 10
                                        }}
                                    ></TextField>
                                ) : (
                                    <TextField
                                        color="secondary"
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
                                        variant="outlined"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
                                        name="phone"
                                        label="Phone Number"
                                        type="number"
                                        value={phone}
                                        onChange={onChange}
                                        inputProps={{
                                            maxLength: 10
                                        }}

                                    ></TextField>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                {errors.password ? (
                                    <TextField
                                        color="secondary"
                                        error
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
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
                                        color="secondary"
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
                                        variant="outlined"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={onChange}
                                    ></TextField>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {errors.password2 ? (
                                    <TextField
                                        error
                                        color="secondary"
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
                                        variant="outlined"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
                                        name="password2"
                                        label="Re-enter your Password"
                                        type="password"
                                        value={password2}
                                        onChange={onChange}
                                        helperText={errors.password2}
                                    ></TextField>
                                ) : (
                                    <TextField
                                        color="secondary"
                                        fullWidth
                                        style={{
                                            marginBottom: "1rem",
                                        }}
                                        variant="outlined"
                                        name="password2"
                                        InputLabelProps={{
                                            style: { color: "#c7c4c0" },
                                        }}
                                        label="Re-enter your Password"
                                        type="password"
                                        value={password2}
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
                                        Submit
                                    </Button>
                                )}
                            </Grid>
                        </Container>
                    </form>
                </Grid>
            </Card>
            <Card style={{ padding: "1rem", marginTop: "1rem" }} elevation={5}>
                <Typography align="center">
                    Have an account&nbsp;?&nbsp; &nbsp;
                    <NavLink
                        style={{
                            outline: "2px solid #303030",
                            padding: "0.5rem",
                            outlineRadius: "1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        to="/"
                    >
                        {" "}
                        Log in
                    </NavLink>
                </Typography>
            </Card>
        </Container>
    );
}
Register.prototype = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
    withRouter(Register)
);
