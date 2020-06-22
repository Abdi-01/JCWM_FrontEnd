import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

/*
Penuliasan functional component biasanya digunakan untuk membuat component yang tidak membutuhkan data state.
Hanya merender component yang kita ingin buat. Jika dibandingkan dengan class component ini sama dengan
fungsi 
    render(){
        return()
    } 
*/
export default (props) => {
    const classes = useStyles();
    
    return (
        //Jangan lupa, pada react penulisan atribute class pada <tag> diganti dengan className
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                             {/*🔽props yg diambli dari App.js nama props tergantung nama yg dibikin di App.js, kecuali children */}
                        News {props.data + ' ' + props.hobby + ' ' + props.children}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}