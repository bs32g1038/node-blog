import { useState, useCallback } from 'react';
export default function useRequestLoading() {
    const [loading, setLoading] = useState(false);
    const injectRequestLoading = useCallback((promise: Promise<any>) => {
        setLoading(true);
        return promise
            .then((res) => {
                setLoading(false);
                return { res, err: null };
            })
            .catch((err) => {
                setLoading(false);
                return { res: null, err };
            })
            .then(({ res, err }) => {
                if (err) {
                    throw new Error(err);
                }
                return res;
            });
    }, []);
    return {
        loading,
        setLoading,
        injectRequestLoading,
    };
}
