import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Paper from "@mui/material/Paper"

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import React, { useEffect } from "react";
import PlaylistIcon from '@mui/icons-material/FeaturedPlayList';
import { NavLink, useLocation } from 'react-router-dom';
export default function BottomNav() {
    const location = useLocation();
    const [value, setValue] = React.useState<number | string>(0);
    useEffect(() => {
      setValue(location.pathname)
    }, [location])

    return (
      <Box sx={{ display: 'flex', borderTop: '1px solid white' }}>
        <Paper elevation={5} square sx={{ display: 'flex', flexGrow: 1 }}>
          <BottomNavigation
            sx={{ flexGrow: 1 }}
            showLabels
            value={value}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} value="/home" component={NavLink} to="/home" />
            <BottomNavigationAction label="Songs" icon={<MusicNoteIcon />} value="/songs" component={NavLink} to="/songs" />
            <BottomNavigationAction label="Lists" icon={<QueueMusicIcon />} value="/playlists" component={NavLink} to="/playlists" />
          </BottomNavigation>
        </Paper>

      </Box>
    );
  }