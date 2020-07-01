import React from 'react';
import {
    Menu, MenuItem, Avatar,
    AppBar, Toolbar, IconButton, Typography, InputBase
    , fade, makeStyles, Badge
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CartIcon from '@material-ui/icons/AddShoppingCart'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        margin: '0 1vw 0 1vw'
    },
    titleEnd: {
        // flexGrow: 1,
        margin: '0 1vw 0 1vw',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#404146", 0.15),
        '&:hover': {
            backgroundColor: fade("#404146", 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#404146"
    },
    inputRoot: {
        color: "#404146",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#f1f2f6" }}>
                <Toolbar>
                    <div style={{ display: 'flex', width: "100%", height: '100%' }}>
                        <img src={require('../assets/images/logoA.png')} width="4%" />
                        <Typography className={classes.title} variant="h6" noWrap>
                            <Link to="/" style={{ color: '#2f3542', textDecoration: 'none' }}>
                                Home
                        </Link>
                        </Typography>
                        <Typography className={classes.title} variant="h6" noWrap>
                            <Link to="/product" style={{ color: '#2f3542', textDecoration: 'none' }}>
                                Product
                        </Link>
                        </Typography>
                        <Typography className={classes.titleEnd} variant="h6" noWrap>
                            <Link to="/profile" style={{ color: '#2f3542', textDecoration: 'none' }}>
                                Profile
                        </Link>
                        </Typography>
                    </div>
                    {/* <img className={classes.titleEnd} src={require('../assets/images/logoname.png')} width="7%" /> */}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Badge badgeContent={props.data.cart.length} style={{ margin: 'auto' }} color="primary">
                            <CartIcon style={{ color: "#404146", marginLeft: '1vw' }} />
                        </Badge>
                        <div>
                            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                {props.data.id > 0 ? <Avatar alt="Travis Howard" src={`https://api.adorable.io/avatars/285/${props.data.username}.png`} /> : <AccountCircleIcon />}
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {props.data.id > 0
                                    ?
                                    props.data.role === "user"
                                        ?
                                        <>
                                            <Link to="/login" style={{ textDecoration: 'none', color: "#404146" }}>
                                                <MenuItem onClick={handleClose}>
                                                    Profile
                                                </MenuItem>
                                            </Link>
                                            <Link to="/login" style={{ textDecoration: 'none', color: "#404146" }}>
                                                <MenuItem onClick={handleClose}>
                                                    Cart
                                                </MenuItem>
                                            </Link>
                                            <Link style={{ textDecoration: 'none', color: "#404146" }}>
                                                <MenuItem onClick={props.funcLogout}>
                                                    Logout
                                                </MenuItem>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            <Link to="/login" style={{ textDecoration: 'none', color: "#404146" }}>
                                                <MenuItem onClick={handleClose}>
                                                    Product Management
                                                </MenuItem>
                                            </Link>
                                            <Link to="/login" style={{ textDecoration: 'none', color: "#404146" }}>
                                                <MenuItem onClick={handleClose}>
                                                    Account Management
                                                </MenuItem>
                                            </Link>
                                            <Link to="/login" style={{ textDecoration: 'none', color: "#404146" }}>
                                                <MenuItem onClick={handleClose}>
                                                    Transaction Management
                                                </MenuItem>
                                            </Link>
                                            <Link style={{ textDecoration: 'none', color: "#404146" }}>
                                                <MenuItem onClick={props.funcLogout}>
                                                    Logout
                                                </MenuItem>
                                            </Link>
                                        </>
                                    :
                                    <>
                                        <Link to="/login" style={{ textDecoration: 'none', color: "#404146" }}>
                                            <MenuItem onClick={handleClose}>
                                                Login
                                            </MenuItem>
                                        </Link>
                                        <Link to="/register" style={{ textDecoration: 'none', color: "#404146" }}>
                                            <MenuItem onClick={handleClose}>
                                                Register
                                            </MenuItem>
                                        </Link>
                                    </>
                                }
                            </Menu>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}