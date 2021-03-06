import React from 'react';
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { navigate } from 'hookrouter'
import { DoctorModal } from './models';
import { DOCTOR_SPECIALIZATION } from '../../Constants/constants';

interface DoctorsCountProps extends DoctorModal {
    facilityId: number;
}

const useStyles = makeStyles({
    countText:{
        fontSize: '2.25rem'
    }
});

const DoctorsCountCard = (props: DoctorsCountProps) => {
    const classes = useStyles();
    const specialization = DOCTOR_SPECIALIZATION.find(i=>i.id === props.area);
    const area = specialization ? specialization.text : "Unknown";
    return (
        <Grid item xs={12} md={6}>
            <div className="w3-card" >
                <div className="w3-padding">
                    <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography className={classes.countText}>
                                {props.count}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className="w3-text-grey">
                                {area}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined"
                                onClick={() => navigate(`/facility/${props.facilityId}/doctor/${props.area}`)}>
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Grid>
    );
};

export default DoctorsCountCard;