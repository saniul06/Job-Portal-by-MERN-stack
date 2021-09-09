import { Helmet } from 'react-helmet';
import React from 'react';

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default MetaData;
