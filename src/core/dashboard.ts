/**
 * Dashboard Interface
 * 
 * Provides visualization and interaction capabilities for the neural core
 */

import { NeuralCore, GrowthMetrics } from './neural-core';

export interface DashboardConfig {
  updateInterval: number;
  enableAutoRefresh: boolean;
}

/**
 * Dashboard for monitoring and interacting with the neural core
 */
export class NeuralDashboard {
  private core: NeuralCore;
  private config: DashboardConfig;
  private refreshTimer?: NodeJS.Timeout;

  constructor(core: NeuralCore, config?: Partial<DashboardConfig>) {
    this.core = core;
    this.config = {
      updateInterval: 5000,
      enableAutoRefresh: true,
      ...config
    };
  }

  /**
   * Get dashboard summary
   */
  getSummary(): {
    metrics: GrowthMetrics;
    status: string;
    lastUpdate: number;
  } {
    const metrics = this.core.getGrowthMetrics();
    const state = this.core.getState();
    
    return {
      metrics,
      status: this.determineStatus(metrics),
      lastUpdate: state.timestamp
    };
  }

  /**
   * Determine system status based on metrics
   */
  private determineStatus(metrics: GrowthMetrics): string {
    if (metrics.knowledgeSize === 0) {
      return 'initializing';
    } else if (metrics.knowledgeSize < 10) {
      return 'learning';
    } else if (metrics.integrationLevel > 0) {
      return 'integrated';
    } else {
      return 'growing';
    }
  }

  /**
   * Display dashboard in console
   */
  display(): void {
    const summary = this.getSummary();
    console.log('\n=== Neural Dashboard ===');
    console.log(`Status: ${summary.status}`);
    console.log(`Knowledge Size: ${summary.metrics.knowledgeSize}`);
    console.log(`Adaptability Score: ${summary.metrics.adaptabilityScore.toFixed(2)}%`);
    console.log(`Integration Level: ${summary.metrics.integrationLevel}`);
    console.log(`Last Update: ${new Date(summary.lastUpdate).toISOString()}`);
    console.log('========================\n');
  }

  /**
   * Start auto-refresh
   */
  startAutoRefresh(): void {
    if (this.config.enableAutoRefresh && !this.refreshTimer) {
      this.refreshTimer = setInterval(() => {
        this.display();
      }, this.config.updateInterval);
    }
  }

  /**
   * Stop auto-refresh
   */
  stopAutoRefresh(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = undefined;
    }
  }

  /**
   * Get detailed knowledge view
   */
  getKnowledgeView(): Array<{ key: string; value: any }> {
    const knowledge = this.core.getKnowledge();
    return Array.from(knowledge.entries()).map(([key, value]) => ({
      key,
      value
    }));
  }
}
