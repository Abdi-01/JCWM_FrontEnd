import React from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '2vh 2vw'
    },
    media: {
        height: 140
    }
})

export default (props) => {
    // console.log(props)
    let { data } = props
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={data.featured_image}
                    title="food-media"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        {data.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h4">
                        {data.location.address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.timings}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Detail
                </Button>
            </CardActions>
        </Card>
    )
}