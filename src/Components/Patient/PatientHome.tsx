import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { navigate } from 'hookrouter';
import { Loading } from '../Common/Loading';
import { getPatient } from '../../Redux/actions';
import { PatientModal } from './models';
import { MEDICAL_HISTORY_CHOICES, GENDER_TYPES } from "../../Constants/constants";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: '8px'
    },
    margin: {
        margin: theme.spacing(1)
    },
    displayFlex: {
        display: 'flex'
    },
    content: {
        marginTop: "10px",
        maxWidth: "560px",
        background: "white",
        padding: "20px 20px 5px",
    },
    title: {
        padding: '5px',
        marginBottom: '10px'
    }
}));

export const PatientHome = (props: any) => {
    const { facilityId, id } = props;
    const classes = useStyles();
    const dispatch: any = useDispatch();
    const [patientData, setPatientData] = useState<PatientModal>({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        const patientRes = await dispatch(getPatient({ id }));
        if (patientRes && patientRes.data) {
            setPatientData(patientRes.data);
        }
        setIsLoading(false);
    }, [dispatch, id]);

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [dispatch, fetchData]);

    if (isLoading) {
        return <Loading />
    }

    const patientGender = GENDER_TYPES.find(i => i.id === patientData.gender)?.text;
    let patientMedHis: any[] = [];
    if (patientData && patientData.medical_history && patientData.medical_history.length) {
        const medHis = patientData.medical_history;
        patientMedHis = MEDICAL_HISTORY_CHOICES.filter(choice => medHis.find(item => item.id === choice.id));
    }

    return (
        <div className={`w3-content ${classes.content}`}>
            <h2>Patient</h2>
            <Grid container style={{ padding: "10px", marginBottom: '5px' }} spacing={2}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h6" component="h6">{patientData.name}</Typography>
                    <Typography>Age : {patientData.age}</Typography>
                    <Typography>Gender : {patientGender}</Typography>
                    <Typography>Phone : {patientData.phone_number}</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Grid container spacing={1} direction="column">
                        <Grid item xs={12} className="w3-center">
                            <Button fullWidth variant="contained" color="primary" size="small"
                                onClick={() => navigate(`/facility/${facilityId}/patient/${id}/update`)}>
                                Update Patient Info
                            </Button>
                        </Grid>
                        <Grid item xs={12} className="w3-center">
                            <Button fullWidth variant="contained" color="primary" size="small"
                                onClick={() => navigate(`/facility/${facilityId}/patient/${id}/treatment`)}>
                                Add Treatement Info
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>

            <Grid container style={{ padding: "10px" }} spacing={1}>
                <Grid item xs={12}>
                    <div className={`w3-black ${classes.title}`}>
                        <Typography>
                            Have you had contact with someone who was diagnosed with Covid 19?
                        </Typography>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Typography>
                            {patientData.contact_with_carrier ? 'Yes' : 'No'}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={`w3-black w3-center ${classes.title}`}>
                        <Typography>
                            Medical History
                        </Typography>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        medical history
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <h5>Details</h5>
                        <Typography>
                            Medical History Details
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={`w3-black w3-center ${classes.title}`}>
                        <Typography>
                            Treatment History
                        </Typography>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Typography>
                            Treatment history details
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );

};
