import React from 'react';
import Loader from '../loader.gif';

const LoadingPage = () => (
    <div className='loader'>
        <img className='loader__image' src={Loader} alt='loading'/>
    </div>
);

export default LoadingPage;