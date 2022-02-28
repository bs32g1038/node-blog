import axios from '@blog/client/admin/axios';
import { uniqueId } from 'lodash';
import { useEffect, useState, useCallback } from 'react';

export default function useRequest(url, params = {}) {
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(null);
    const [update, setUpdate] = useState('');
    const _setUpdate = useCallback(() => setUpdate(uniqueId()), []);
    useEffect(() => {
        setLoading(true);
        axios.get(url, { params }).then((res) => {
            setLoading(false);
            setState(res.data);
        });
    }, [url, JSON.stringify(params), update]);
    return [state, _setUpdate, loading];
}
