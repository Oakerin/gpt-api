import test from 'node:test'
import assert from 'node:assert'
import { checkStatus } from '../../src/utils/checkStatus.mjs'
import { mockOpenai } from '../../mocks/mockOpenai.mjs'

test('checkStatus', async (t) => {
    await t.test('should return mockId', async (t) => {
        const status = await checkStatus(mockOpenai, 'mockId')
        assert.strictEqual(status.id, 'mockId');
    });
});