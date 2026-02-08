/**
 * Tests for Neural Dashboard
 */

import { NeuralCore } from '../core/neural-core';
import { NeuralDashboard } from '../core/dashboard';

describe('NeuralDashboard', () => {
  let core: NeuralCore;
  let dashboard: NeuralDashboard;

  beforeEach(() => {
    core = new NeuralCore(0.1);
    dashboard = new NeuralDashboard(core, { enableAutoRefresh: false });
  });

  afterEach(() => {
    dashboard.stopAutoRefresh();
  });

  describe('Summary', () => {
    test('should get dashboard summary', () => {
      const summary = dashboard.getSummary();
      
      expect(summary).toHaveProperty('metrics');
      expect(summary).toHaveProperty('status');
      expect(summary).toHaveProperty('lastUpdate');
    });

    test('should show initializing status when no knowledge', () => {
      const summary = dashboard.getSummary();
      expect(summary.status).toBe('initializing');
    });

    test('should show learning status with small knowledge base', () => {
      core.learn('key1', 'value1');
      const summary = dashboard.getSummary();
      expect(summary.status).toBe('learning');
    });

    test('should show growing status with larger knowledge base', () => {
      for (let i = 0; i < 15; i++) {
        core.learn(`key${i}`, `value${i}`);
      }
      const summary = dashboard.getSummary();
      expect(summary.status).toBe('growing');
    });

    test('should show integrated status when integrations exist', () => {
      for (let i = 0; i < 15; i++) {
        core.learn(`key${i}`, `value${i}`);
      }
      core.integrate('system1', () => {});
      const summary = dashboard.getSummary();
      expect(summary.status).toBe('integrated');
    });
  });

  describe('Display', () => {
    test('should display without errors', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      dashboard.display();
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should display metrics in output', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      core.learn('key1', 'value1');
      dashboard.display();
      
      const output = consoleSpy.mock.calls.map(call => call[0]).join('\n');
      expect(output).toContain('Neural Dashboard');
      expect(output).toContain('Knowledge Size');
      expect(output).toContain('Status');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Auto-refresh', () => {
    test('should start auto-refresh when enabled', () => {
      const dashboardWithRefresh = new NeuralDashboard(core, {
        enableAutoRefresh: true,
        updateInterval: 100
      });
      
      dashboardWithRefresh.startAutoRefresh();
      dashboardWithRefresh.stopAutoRefresh();
    });

    test('should not start auto-refresh when disabled', () => {
      dashboard.startAutoRefresh();
      // Should not throw and should handle disabled state
    });

    test('should stop auto-refresh', () => {
      const dashboardWithRefresh = new NeuralDashboard(core, {
        enableAutoRefresh: true,
        updateInterval: 100
      });
      
      dashboardWithRefresh.startAutoRefresh();
      dashboardWithRefresh.stopAutoRefresh();
      // Should not throw
    });
  });

  describe('Knowledge View', () => {
    test('should get knowledge view as array', () => {
      core.learn('key1', 'value1');
      core.learn('key2', 'value2');
      
      const view = dashboard.getKnowledgeView();
      
      expect(Array.isArray(view)).toBe(true);
      expect(view).toHaveLength(2);
    });

    test('should include key and value in knowledge view', () => {
      core.learn('test-key', 'test-value');
      
      const view = dashboard.getKnowledgeView();
      
      expect(view[0]).toHaveProperty('key');
      expect(view[0]).toHaveProperty('value');
      expect(view[0].key).toBe('test-key');
      expect(view[0].value).toBe('test-value');
    });

    test('should handle empty knowledge base', () => {
      const view = dashboard.getKnowledgeView();
      expect(view).toHaveLength(0);
    });
  });

  describe('Integration with Core', () => {
    test('should reflect core metrics', () => {
      core.learn('key1', 'value1');
      core.integrate('system1', () => {});
      
      const summary = dashboard.getSummary();
      
      expect(summary.metrics.knowledgeSize).toBe(1);
      expect(summary.metrics.integrationLevel).toBe(1);
    });

    test('should update last update timestamp', (done) => {
      const initialSummary = dashboard.getSummary();
      const initialTimestamp = initialSummary.lastUpdate;
      
      setTimeout(() => {
        core.learn('key1', 'value1');
        const newSummary = dashboard.getSummary();
        expect(newSummary.lastUpdate).toBeGreaterThan(initialTimestamp);
        done();
      }, 10);
    });
  });
});
