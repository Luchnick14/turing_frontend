import React from "react";
import { Box, Avatar } from "@mui/material";
import { colors } from '../styles/colorPalette'

const TopPerformers = () => {


    return (
        <Box>
            <h2>Users with Top Performance</h2>
            <Box display={"flex"} flexDirection={"row"} alignItems={"baseline"}>
                <Box p={"0 7rem 0 7rem"}>
                    <Avatar sx={{ bgcolor: colors.primary, height: '10rem', width: '10rem' }}></Avatar>
                </Box>
                <Box>
                    <Avatar sx={{ bgcolor: colors.primary, height: '13rem', width: '13rem' }}></Avatar>
                </Box>
                <Box p={"0 7rem 0 7rem"}>
                    <Avatar sx={{ bgcolor: colors.primary, height: '10rem', width: '10rem' }}></Avatar>
                </Box>
            </Box>
        </Box>
    );
}

export default TopPerformers;