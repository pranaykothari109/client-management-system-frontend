import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const URL = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            navigate('/dashboard');
        }
    }, [])
    
    
    const handleChange = (e) => {
        const { value, name } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        try {
            const res = await axios.post(`${URL}/user/login`, formData);
            if (res.data) {
                await localStorage.setItem("token", res.data);
                navigate('/dashboard');
        }
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <Box>
        <Stack direction="column" spacing={2}>
            <Typography variant="h5" align="center">
            Login
            </Typography>
            <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            />
            <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            />
            <Button color="accent" variant="contained" onClick={handleSubmit}>
            Login
            </Button>
        </Stack>
        </Box>
    );
}

export default Login;
