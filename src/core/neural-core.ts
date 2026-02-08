/**
 * Core Neural Learning Module
 * 
 * This module implements a learning system that grows and becomes
 * integral to the core functionality. It provides:
 * - Learning capabilities
 * - Growth through adaptive patterns
 * - Integration interfaces for external systems
 */

export interface LearningState {
  knowledge: Map<string, any>;
  learningRate: number;
  iterations: number;
  timestamp: number;
}

export interface GrowthMetrics {
  knowledgeSize: number;
  adaptabilityScore: number;
  integrationLevel: number;
}

/**
 * Core learning engine that evolves over time
 */
export class NeuralCore {
  private state: LearningState;
  private integrationHandlers: Map<string, (data: any) => void>;

  constructor(initialLearningRate: number = 0.1) {
    this.state = {
      knowledge: new Map(),
      learningRate: initialLearningRate,
      iterations: 0,
      timestamp: Date.now()
    };
    this.integrationHandlers = new Map();
  }

  /**
   * Learn from new data and grow the knowledge base
   */
  learn(key: string, value: any): void {
    this.state.knowledge.set(key, value);
    this.state.iterations++;
    this.state.timestamp = Date.now();
    
    // Adaptive learning: adjust learning rate based on growth
    this.adaptLearningRate();
  }

  /**
   * Retrieve learned knowledge
   */
  retrieve(key: string): any {
    return this.state.knowledge.get(key);
  }

  /**
   * Get all learned knowledge
   */
  getKnowledge(): Map<string, any> {
    return new Map(this.state.knowledge);
  }

  /**
   * Adaptive learning rate adjustment
   */
  private adaptLearningRate(): void {
    // As knowledge grows, fine-tune the learning rate
    const knowledgeSize = this.state.knowledge.size;
    if (knowledgeSize > 100) {
      this.state.learningRate = Math.max(0.01, this.state.learningRate * 0.99);
    }
  }

  /**
   * Register an integration handler for external systems
   */
  integrate(systemName: string, handler: (data: any) => void): void {
    this.integrationHandlers.set(systemName, handler);
  }

  /**
   * Trigger integration with a specific system
   */
  triggerIntegration(systemName: string, data: any): boolean {
    const handler = this.integrationHandlers.get(systemName);
    if (handler) {
      handler(data);
      return true;
    }
    return false;
  }

  /**
   * Get growth metrics
   */
  getGrowthMetrics(): GrowthMetrics {
    return {
      knowledgeSize: this.state.knowledge.size,
      adaptabilityScore: this.state.learningRate * 100,
      integrationLevel: this.integrationHandlers.size
    };
  }

  /**
   * Export current state for persistence
   */
  exportState(): string {
    return JSON.stringify({
      knowledge: Array.from(this.state.knowledge.entries()),
      learningRate: this.state.learningRate,
      iterations: this.state.iterations,
      timestamp: this.state.timestamp
    });
  }

  /**
   * Import state from persistence
   */
  importState(stateJson: string): void {
    const imported = JSON.parse(stateJson);
    this.state = {
      knowledge: new Map(imported.knowledge),
      learningRate: imported.learningRate,
      iterations: imported.iterations,
      timestamp: imported.timestamp
    };
  }

  /**
   * Get current learning state
   */
  getState(): LearningState {
    return {
      ...this.state,
      knowledge: new Map(this.state.knowledge)
    };
  }
}
