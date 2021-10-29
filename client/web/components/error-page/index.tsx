import React from 'react';
interface Props {
    statusCode: number;
}

const Error = (props: Props) => {
    return <div>test</div>;
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
