import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status" variant="primary" className="m-3" ></Spinner>
        </div>
    );
};

export default Loading;