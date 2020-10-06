import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';


export default (props) => {
    return (
        <Card style={{ margin: '1vh 0',backgroundColor:'#74B9FF' }}>
            <CardContent>
                <Typography variant="h2">
                    Makan Cuy !!!
                    </Typography>
                    <Typography variant="subtitle2">
                        Makan Kenyang Hidup Tenang
                    </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary">
                    Gas Yuuk
                </Button>
            </CardActions>
        </Card>
    )
}