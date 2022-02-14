import LRU from 'lru-cache';
const cache = new LRU({ max: 500 });

export const TimeExpression = {
    TIME_5_MINUTES: 1000 * 60 * 5,
};

export default cache;
