import axios from 'axios';

const apiKey = process.env.TOUR_API_KEY;

const api = axios.create({
    baseURL: 'https://apis.data.go.kr/B551011/KorService1',
    params: {
        numOfRows: 10,
        pageNo: 1,
        MobileOS: 'WIN',
        MobileApp: 'testApp',
        _type: 'json',
        serviceKey: apiKey,
    },
});

export default api;
