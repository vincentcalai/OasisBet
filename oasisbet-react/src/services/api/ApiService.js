import axios from 'axios';

const fetchResults = async (compType, selectedDate, dateFrom, dateTo) => {
    try {
        const formattedDateFrom = dateFrom.toISOString();
        const formattedDateTo = dateTo.toISOString();

        const params = {
            compType: compType,
            selectedDate: selectedDate,
            dateFrom: formattedDateFrom,
            dateTo: formattedDateTo
        };

        console.log("calling retrieve results api!");
        console.log("compType: " + compType + " selectedDate: " + selectedDate + " dateFrom: " + dateFrom + " dateTo: " + dateTo);

        const response = await axios.get('http://localhost:8765/result/retrieveResults', { params });
        
        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }

        const data = response.data;
        console.log("data fetched! data: ", data);
        return data.resultEvent.map(event => ({
            ...event,
            startTime: new Date(event.startTime)
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};

const fetchOdds = async (compType) => {
    try {
        console.log("calling /odds/retrieveOdds api!");
        console.log("compType: " + compType);

        const response = await axios.get('http://localhost:8765/odds/retrieveOdds', {
            params: { compType: compType }
        });

        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }

        const data = response.data;
        console.log("data fetched! data: ", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }   
};


const createUser = async (request) => {
    try {
        console.log("calling /user/createUser api!");
        console.log("create user api request: ", request);

        const response = await axios.post('http://localhost:8765/user/createUser', request);

        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to create user');
        }

        const data = response.data;
        console.log("Response data: ", data);
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const submitBets = async (request) => {
    try {
        console.log("calling /odds/bets api!");
        console.log("submit bets api request: ", request);

        const response = await axios.post('http://localhost:8765/odds/bets', request);

        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to submit bet');
        }

        const data = response.data;
        console.log("Response data: ", data);
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
  
export { fetchResults, fetchOdds, createUser, submitBets };
  