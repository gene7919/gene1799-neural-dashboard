/**
 * Main entry point for the Neural Dashboard
 * Demonstrates the growing, learning, and integrating core
 */

import { NeuralCore } from './core/neural-core';
import { NeuralDashboard } from './core/dashboard';

/**
 * Example: Demonstrate the neural core growing and learning
 */
function demonstrateGrowthAndLearning() {
  console.log('🚀 Initializing Neural Dashboard Core...\n');
  
  // Create the core learning engine
  const core = new NeuralCore(0.1);
  
  // Create dashboard to visualize the core
  const dashboard = new NeuralDashboard(core, {
    enableAutoRefresh: false
  });
  
  // Initial state
  dashboard.display();
  
  // Demonstrate learning
  console.log('📚 Learning phase: Adding knowledge...');
  core.learn('concept:neural', 'Neural networks are computational models');
  core.learn('concept:learning', 'Learning is the acquisition of knowledge');
  core.learn('concept:growth', 'Growth is continuous improvement');
  core.learn('concept:integration', 'Integration connects systems together');
  
  dashboard.display();
  
  // Demonstrate growth through more learning
  console.log('🌱 Growth phase: Expanding knowledge base...');
  for (let i = 0; i < 10; i++) {
    core.learn(`data:sample${i}`, { value: Math.random(), iteration: i });
  }
  
  dashboard.display();
  
  // Demonstrate integration
  console.log('🔗 Integration phase: Connecting to external systems...');
  core.integrate('analytics', (data) => {
    console.log(`  ✓ Analytics system received: ${JSON.stringify(data)}`);
  });
  
  core.integrate('monitoring', (data) => {
    console.log(`  ✓ Monitoring system received: ${JSON.stringify(data)}`);
  });
  
  // Trigger integrations
  core.triggerIntegration('analytics', { event: 'learning_complete', size: 14 });
  core.triggerIntegration('monitoring', { status: 'healthy', uptime: 100 });
  
  dashboard.display();
  
  // Show knowledge view
  console.log('📊 Knowledge View:');
  const knowledgeView = dashboard.getKnowledgeView();
  knowledgeView.slice(0, 5).forEach(item => {
    console.log(`  - ${item.key}: ${JSON.stringify(item.value)}`);
  });
  if (knowledgeView.length > 5) {
    console.log(`  ... and ${knowledgeView.length - 5} more items\n`);
  }
  
  // Export state for persistence
  console.log('💾 Exporting state for persistence...');
  const exportedState = core.exportState();
  console.log(`State exported (${exportedState.length} bytes)\n`);
  
  // Demonstrate state restoration
  console.log('♻️  Demonstrating state restoration...');
  const newCore = new NeuralCore();
  newCore.importState(exportedState);
  const metrics = newCore.getGrowthMetrics();
  console.log(`Restored core with ${metrics.knowledgeSize} knowledge items\n`);
  
  console.log('✅ Neural Dashboard Core is fully operational!');
  console.log('   - Growing: Knowledge base expands with learning');
  console.log('   - Learning: Adaptive learning rate adjusts with growth');
  console.log('   - Integrating: Connected to external systems\n');
}

// Export main components
export { NeuralCore } from './core/neural-core';
export { NeuralDashboard } from './core/dashboard';

// Run demonstration if executed directly
if (require.main === module) {
  demonstrateGrowthAndLearning();
}
