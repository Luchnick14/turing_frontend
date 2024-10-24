import React from "react";
import { colors } from "../styles/colorPalette"; 
import { Box, Typography } from "@mui/material"; 


const Users = () => {

    return(
        <Box>
            <h2>Users</h2>
            <Box 
                sx={{ height: '13rem', width: '20rem', bgcolor: colors.accent, borderRadius: '0.8rem'}} 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'}
            >
                <Typography variant="h5" gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>User name and Lastname</Typography>
            </Box>
        </Box>
    )
};

export default Users;