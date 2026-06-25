import { describe, it } from 'node:test';
import assert from 'node:assert';

// Task validation function
function validateTaskTitle(title) {
  if (!title || title.trim() === '') {
    return false;
  }
  return true;
}

describe('Lab 3 - Task Validation Rules', () => {
  it('should pass if title is valid', () => {
    assert.strictEqual(validateTaskTitle('Finish Lab 3'), true);
  });

  it('should fail if title is empty or consists of only spaces', () => {
    assert.strictEqual(validateTaskTitle('   '), false);
    assert.strictEqual(validateTaskTitle(''), false);
  });
});