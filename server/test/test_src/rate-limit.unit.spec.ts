import RateLimit from '../../src/utils/rate-limit.util';

describe('RateLimit', () => {
    it('fake req', async () => {
        const rate = RateLimit({
            limitCount: 0,
        });
        const rs = await rate({ headers: { 'x-real-ip': 'test' } }, { status: () => ({ json: _ => 'test' }) }, _ => _);
        expect(rs).toEqual('test');
    });
    it('RateLimit option undefined', async () => {
        RateLimit(undefined);
        expect(1).toEqual(1);
    });
});
