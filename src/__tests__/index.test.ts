import Wrapper from '..';

const testWrap = new Wrapper();

test('naive articleViewCount implementation', async () => {
    const result = await testWrap.articleViewCount('day', 'Johann_Wolfgang_von_Goethe');
    expect(result).toBe(42622);
});
