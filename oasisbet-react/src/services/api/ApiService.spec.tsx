// Import dependencies
import axios from 'axios';
import { fetchResults } from './ApiService';
import axiosInstance from './InterceptorService'; // Adjust the path based on your file structure

jest.mock('./InterceptorService');
jest.mock('axios');

describe('ApiService service class', () => {

    const mockCompType = 'soccer';
    const mockSelectedDate = '2024-09-13';
    const mockDateFrom = new Date('2024-09-01');
    const mockDateTo = new Date('2024-09-10');
    
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    // it('should fetch results successfully and format the start time', async () => {
    //     // Mock API response
    //     const mockResponse = {
    //         status: 200,
    //         data: {
    //             resultEvent: [
    //                 { eventId: 1, eventDesc: 'Match 1', startTime: '2024-09-05T10:00:00Z' },
    //                 { eventId: 2, eventDesc: 'Match 2', startTime: '2024-09-06T12:00:00Z' }
    //             ]
    //         }
    //     };

    //     // Mock axios get request to return the mock response
    //     jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

    //     // Call the function
    //     const result = await fetchResults(mockCompType, mockSelectedDate, mockDateFrom, mockDateTo);

    //     // Check that the axios.get was called with the correct parameters
    //     expect(axios.get).toHaveBeenCalledWith(
    //         'http://example.com/result/retrieveResults', // Replace with correct URL
    //         { params: { compType: mockCompType, selectedDate: mockSelectedDate, dateFrom: mockDateFrom.toISOString(), dateTo: mockDateTo.toISOString() } }
    //     );

    //     // Check that the result is formatted correctly
    //     expect(result).toEqual([
    //         { eventId: 1, eventDesc: 'Match 1', startTime: new Date('2024-09-05T10:00:00Z') },
    //         { eventId: 2, eventDesc: 'Match 2', startTime: new Date('2024-09-06T12:00:00Z') }
    //     ]);
    // });

    // it('should throw an error if the API response is not 200', async () => {
    //     // Mock an unsuccessful response
    //     const mockErrorResponse = {
    //         status: 500,
    //     };

    //     jest.spyOn(axios, 'get').mockResolvedValueOnce(mockErrorResponse);

    //     // Expect the fetchResults function to throw an error
    //     await expect(fetchResults(mockCompType, mockSelectedDate, mockDateFrom, mockDateTo)).rejects.toThrow('Failed to fetch data');
    // });

    // it('should throw an error if the API call fails', async () => {
    //     // Mock axios to throw an error
    //     const mockError = new Error('Network Error');
    //     jest.spyOn(axios, 'get').mockRejectedValueOnce(mockError);

    //     // Expect the fetchResults function to handle the error and throw it
    //     await expect(fetchResults(mockCompType, mockSelectedDate, mockDateFrom, mockDateTo)).rejects.toThrow('Network Error');
    // });

});
