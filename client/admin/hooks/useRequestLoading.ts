import { useState, useCallback } from 'react';
export default () => {
    const [loading, setLoading] = useState(false);
    const injectRequestLoading = useCallback(
        (promise: Promise<any>) => {
            setLoading(true);
            return promise.then(res => {
                setLoading(false);
                return res;
            });
        },
        [1]
    );
    return {
        loading,
        setLoading,
        injectRequestLoading,
    };
};
