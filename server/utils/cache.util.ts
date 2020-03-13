import LRU from 'lru-cache';
const cache = new LRU();

export const TimeExpression = {
    TIME_5_MINUTES: 1000 * 60 * 5,
};

export default cache;
