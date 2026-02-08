/**
 * Tests for Neural Core
 */

import { NeuralCore } from '../core/neural-core';

describe('NeuralCore', () => {
  let core: NeuralCore;

  beforeEach(() => {
    core = new NeuralCore(0.1);
  });

  describe('Learning', () => {
    test('should learn and store knowledge', () => {
      core.learn('test-key', 'test-value');
      expect(core.retrieve('test-key')).toBe('test-value');
    });

    test('should increment iterations on learning', () => {
      const initialState = core.getState();
      core.learn('key1', 'value1');
      const newState = core.getState();
      expect(newState.iterations).toBe(initialState.iterations + 1);
    });

    test('should update timestamp on learning', () => {
      const initialTimestamp = core.getState().timestamp;
      // Wait a tiny bit to ensure timestamp changes
      setTimeout(() => {
        core.learn('key1', 'value1');
        const newTimestamp = core.getState().timestamp;
        expect(newTimestamp).toBeGreaterThan(initialTimestamp);
      }, 10);
    });
  });

  describe('Growth', () => {
    test('should track knowledge size growth', () => {
      expect(core.getGrowthMetrics().knowledgeSize).toBe(0);
      
      core.learn('key1', 'value1');
      expect(core.getGrowthMetrics().knowledgeSize).toBe(1);
      
      core.learn('key2', 'value2');
      expect(core.getGrowthMetrics().knowledgeSize).toBe(2);
    });

    test('should adapt learning rate as knowledge grows', () => {
      const initialMetrics = core.getGrowthMetrics();
      const initialScore = initialMetrics.adaptabilityScore;
      
      // Add enough knowledge to trigger adaptation
      for (let i = 0; i < 150; i++) {
        core.learn(`key${i}`, `value${i}`);
      }
      
      const newMetrics = core.getGrowthMetrics();
      const newScore = newMetrics.adaptabilityScore;
      
      // Learning rate should decrease as knowledge grows
      expect(newScore).toBeLessThan(initialScore);
    });
  });

  describe('Integration', () => {
    test('should register integration handlers', () => {
      const handler = jest.fn();
      core.integrate('test-system', handler);
      
      const metrics = core.getGrowthMetrics();
      expect(metrics.integrationLevel).toBe(1);
    });

    test('should trigger integration handlers', () => {
      const handler = jest.fn();
      core.integrate('test-system', handler);
      
      const result = core.triggerIntegration('test-system', { test: 'data' });
      
      expect(result).toBe(true);
      expect(handler).toHaveBeenCalledWith({ test: 'data' });
    });

    test('should return false for non-existent integration', () => {
      const result = core.triggerIntegration('non-existent', {});
      expect(result).toBe(false);
    });

    test('should support multiple integrations', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      core.integrate('system1', handler1);
      core.integrate('system2', handler2);
      
      expect(core.getGrowthMetrics().integrationLevel).toBe(2);
    });
  });

  describe('State Management', () => {
    test('should export state as JSON', () => {
      core.learn('key1', 'value1');
      core.learn('key2', { nested: 'object' });
      
      const exported = core.exportState();
      expect(typeof exported).toBe('string');
      expect(() => JSON.parse(exported)).not.toThrow();
    });

    test('should import and restore state', () => {
      core.learn('key1', 'value1');
      core.learn('key2', 'value2');
      const exported = core.exportState();
      
      const newCore = new NeuralCore();
      newCore.importState(exported);
      
      expect(newCore.retrieve('key1')).toBe('value1');
      expect(newCore.retrieve('key2')).toBe('value2');
      expect(newCore.getGrowthMetrics().knowledgeSize).toBe(2);
    });

    test('should preserve state details on export/import', () => {
      core.learn('key1', 'value1');
      const originalState = core.getState();
      const exported = core.exportState();
      
      const newCore = new NeuralCore();
      newCore.importState(exported);
      const restoredState = newCore.getState();
      
      expect(restoredState.iterations).toBe(originalState.iterations);
      expect(restoredState.learningRate).toBe(originalState.learningRate);
    });
  });

  describe('Knowledge Management', () => {
    test('should return copy of knowledge map', () => {
      core.learn('key1', 'value1');
      const knowledge = core.getKnowledge();
      
      // Modify the returned map
      knowledge.set('key2', 'value2');
      
      // Original should not be affected
      expect(core.retrieve('key2')).toBeUndefined();
    });

    test('should get current state', () => {
      core.learn('key1', 'value1');
      const state = core.getState();
      
      expect(state).toHaveProperty('knowledge');
      expect(state).toHaveProperty('learningRate');
      expect(state).toHaveProperty('iterations');
      expect(state).toHaveProperty('timestamp');
    });
  });
});
