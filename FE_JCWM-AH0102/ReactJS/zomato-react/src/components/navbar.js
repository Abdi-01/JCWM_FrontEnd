import React from 'react';
import {
    makeStyles, AppBar, Toolbar, Typography
    , IconButton, Switch, FormControlLabel, FormGroup, MenuItem, Menu, Avatar
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((them) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: them.spacing(2)
    },
    title: {
        // flexGrow: 1
        margin:'0 1vw'
    },
    titleEnd:{
        flexGrow:1
    },
    navbarStyle: {
        backgroundColor: 'gray'
    }
}))

export default (props) => {
    const classes = useStyles()
    const [auth, setAuth] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navbarStyle}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        {props.title}
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        Restaurant
                    </Typography>
                    <Typography variant="h6" className={classes.titleEnd}>
                        Restaurant
                    </Typography>
                    {
                        auth && (
                            <div>
                                <IconButton
                                    aria-label="user account"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleMenu}
                                >
                                    {/* <AccountCircle/> */}
                                    <Avatar alt="user photo" src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>Log Out</MenuItem>
                                </Menu>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}