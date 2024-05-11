const fetchResults = async (compType, selectedDate, dateFrom, dateTo) => {
    try {
        const formattedDateFrom = dateFrom.toISOString();
        const formattedDateTo = dateTo.toISOString();

        const params = new URLSearchParams({
        compType: compType,
        selectedDate: selectedDate,
        dateFrom: formattedDateFrom,
        dateTo: formattedDateTo
        });

        console.log("calling retrieve results api!");
        console.log("compType: " + compType + " selectedDate: " + selectedDate + " dateFrom: " + dateFrom + " dateTo: " + dateTo);

        const response = await fetch(`http://localhost:8765/result/retrieveResults?${params}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
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
        console.log("calling retrieve odds api!");
        console.log("compType: " + compType);

        const response = await fetch(`http://localhost:8765/odds/retrieveOdds?compType=${compType}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("data fetched! data: ", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }   
};
  
  export { fetchResults };
  export { fetchOdds };
  