import React from 'react';
import { Typography } from '@material-ui/core';
import { Cards, Chart, Country } from './components';
import styles from './app.module.css';
import { fetchData } from './api';

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;

        return (
        <div className={styles.container}>
            <Typography variant="h4">Covid-19 App</Typography>
            <Cards data={data} />
            <Country handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country}/>
            <Typography variant="body2">&copy;{(new Date().getFullYear())}</Typography>
        </div>
        )
    }
}

export default App;