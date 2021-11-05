import axios from '@blog/client/admin/axios';
import { useEffect, useState } from 'react';

export default function useRequest(url, params = {}) {
    const [state, setState] = useState(null);
    useEffect(() => {
        axios.get(url, { params }).then((res) => {
            setState(res.data);
        });
    }, [url, JSON.stringify(params)]);
    return [state, setState];
}
