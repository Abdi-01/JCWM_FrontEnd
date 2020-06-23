import React from 'react';
import { Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab';

export default (props) => {
    return (
        <Collapse in={props.open}>
            <Alert severity={props.info} action={props.close}>{props.message}</Alert>
        </Collapse>
    )
}