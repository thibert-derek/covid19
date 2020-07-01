import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './cards.module.css';
import cx from 'classnames';

const Cards = ({ data: { confirmed, recovered, deaths, china, lastUpdate } }) => {
    if(!confirmed) {
            return 'Loading...';
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>Infected</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                        <Typography variant="h5">
                            <CountUp 
                            start={0}
                            end={confirmed.value}
                            duration={5}
                            separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">As of {new Date(lastUpdate).toDateString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>Recovered</Typography>
                        <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                        <Typography variant="h5">
                        <CountUp 
                            start={0}
                            end={recovered.value}
                            duration={5}
                            separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">As of {new Date(lastUpdate).toDateString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>Deaths</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                        <Typography variant="h5">
                        <CountUp 
                            start={0}
                            end={deaths.value}
                            duration={5}
                            separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">As of {new Date(lastUpdate).toDateString()}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;