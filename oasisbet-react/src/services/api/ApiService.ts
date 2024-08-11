import axios from 'axios';
import axiosInstance from './InterceptorService.ts';
import SharedVarConstants from '../../constants/SharedVarConstants.ts'; 
import { setSpinner } from '../../component/actions/ReducerAction.ts';

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

        const response = await axios.get(SharedVarConstants.HOST_NAME_URL + 'result/retrieveResults', { params });
        
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

        const response = await axios.get(SharedVarConstants.HOST_NAME_URL + 'odds/retrieveOdds', {
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

const fetchAccountDetails = async (username) => {
    try {
        console.log("calling account/retrieveAccDetails api!");
        console.log("username: " + username);

        const response = await axiosInstance.get(SharedVarConstants.HOST_NAME_URL + 'account/retrieveAccDetails', {
            params: { user: username }
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

const jwtAuthenticate = async (request, dispatch) => {
    try {
        dispatch(setSpinner(true, ''));
        console.log("calling /user/authenticate api!");
        console.log("user authenticate api request: ", request);

        const response = await axios.post(SharedVarConstants.HOST_NAME_URL + 'user/authenticate', request);

        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to authenticate user');
        }

        const data = response.data;
        console.log("Response data: ", data);
        return data;
    } catch (error) {
        console.error('Error authenticate user:', error);
        throw error;
    } finally {
        dispatch(setSpinner(false, ''));
    }
};

const refreshJwtToken = async () => {
    try {
        console.log("calling /user/refreshToken api!");
        const response = await axiosInstance.get(SharedVarConstants.HOST_NAME_URL + 'user/refreshToken');

        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to refresh jwt token!');
        }

        const data = response.data;
        console.log("Response data: ", data);
        return data;
    } catch (error) {
        console.error('Error refresh jwt token:', error);
        throw error;
    }
};

const createUser = async (request) => {
    try {
        console.log("calling /user/createUser api!");
        console.log("create user api request: ", request);

        const response = await axios.post(SharedVarConstants.HOST_NAME_URL + 'user/createUser', request);

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

const updateAccDetails = async (request) => {
    try {
        console.log("calling /account/updateAccDetails api!");
        console.log("update account details api request: ", request);

        const response = await axiosInstance.put(SharedVarConstants.HOST_NAME_URL + 'account/updateAccDetails', request);

        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to update account details');
        }

        const data = response.data;
        console.log("Response data: ", data);
        return data;
    } catch (error) {
        console.error('Error update account details:', error);
        throw error;
    }
};

const updateAccInfo = async (request) => {
    try {
        console.log("calling /account/updateAccInfo api!");
        console.log("update account info api request: ", request);

        const response = await axiosInstance.put(SharedVarConstants.HOST_NAME_URL + 'account/updateAccInfo', request);

        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to update account details');
        }

        const data = response.data;
        console.log("Response data: ", data);
        return data;
    } catch (error) {
        console.error('Error update account details:', error);
        throw error;
    }
};

const submitBets = async (request) => {
    try {
        console.log("calling /odds/bets api!");
        console.log("submit bets api request: ", request);
        const response = await axiosInstance.post(SharedVarConstants.HOST_NAME_URL + 'odds/bets', request);

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

const retrieveMtdAmounts = async (accId) => {
    try {
        console.log("calling /account/retrieveMtdAmounts api!");
        console.log("retrieve MTD amount api request accId: ", accId);

        const response = await axiosInstance.get(SharedVarConstants.HOST_NAME_URL + 'account/retrieveMtdAmounts', {
            params: { accId: accId }
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
}

const retrieveYtdAmounts = async (accId) => {
    try {
        console.log("calling /account/retrieveYtdAmounts api!");
        console.log("retrieve YTD amount api request accId: ", accId);

        const response = await axiosInstance.get(SharedVarConstants.HOST_NAME_URL + 'account/retrieveYtdAmounts', {
            params: { accId: accId }
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
}

const retrieveTrxList = async (accId, selectedTrxType, selectedPeriod) => {
    try {
        console.log("calling /account/retrieveTrx api!");
        console.log("retrieve MTD amount api request accId: ", accId);

        const response = await axiosInstance.get(SharedVarConstants.HOST_NAME_URL + 'account/retrieveTrx', {
            params: { 
                accId: accId,
                type: selectedTrxType,
                period: selectedPeriod
            }
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
}

const terminateAccount = async (accId) => {
    try {
        console.log("calling /account/terminateAcc api!");
        console.log("terminate account api request accId: ", accId);

        const response = await axiosInstance.delete(SharedVarConstants.HOST_NAME_URL + `account/terminateAcc/${accId}`);

        console.log("Response: ", response);

        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }

        const data = response.data;
        console.log("Response data: ", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }   
}

export { 
    fetchResults, 
    fetchOdds, 
    fetchAccountDetails, 
    createUser, 
    updateAccDetails, 
    updateAccInfo, 
    terminateAccount,
    submitBets, 
    retrieveMtdAmounts, 
    retrieveYtdAmounts,
    retrieveTrxList, 
    jwtAuthenticate, 
    refreshJwtToken 
};
  