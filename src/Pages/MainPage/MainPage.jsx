import React from 'react';
import KakaoMapLoader from './components/KakaoMapLoader';
import { useCampingQuery } from '../../Hooks/useCamping';
import { useFestivalQuery } from '../../Hooks/useFestival';

const MainPage = () => {
    // const { data, isLoading, isError, error } = useCampingQuery(37.5665, 126.978);
    const { data, isLoading, isError, error } = useFestivalQuery('20240418');

    if (isLoading) {
        return <h1>Loading....</h1>;
    }

    if (isError) {
        <h2>{error.message}</h2>;
    }

    console.log(data);

    return <div>{/* <KakaoMapLoader /> */}</div>;
};

export default MainPage;
