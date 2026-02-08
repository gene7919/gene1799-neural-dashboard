# Neural Dashboard

A learning and evolving neural dashboard that grows and integrates into core systems.

## Overview

This project implements a neural core that can:
- **Grow**: Continuously expand its knowledge base through learning
- **Learn**: Adapt and improve with an adjustable learning rate
- **Integrate**: Connect with external systems through integration handlers

## Features

- **Adaptive Learning**: Learning rate adjusts as the knowledge base grows
- **State Persistence**: Export and import state for continuity
- **Integration Layer**: Connect to external systems with custom handlers
- **Dashboard Visualization**: Monitor growth metrics and system status
- **TypeScript**: Fully typed for reliability and maintainability

## Installation

```bash
npm install
```

## Usage

### Basic Example

```typescript
import { NeuralCore, NeuralDashboard } from './src/index';

// Create core learning engine
const core = new NeuralCore(0.1);

// Create dashboard
const dashboard = new NeuralDashboard(core);

// Learn new information
core.learn('concept:ai', 'Artificial Intelligence');

// Display dashboard
dashboard.display();

// Integrate with external systems
core.integrate('analytics', (data) => {
  console.log('Analytics received:', data);
});

core.triggerIntegration('analytics', { event: 'learning_complete' });
```

### Running the Demo

```bash
npm run dev
```

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
```

## Architecture

### Core Components

1. **NeuralCore**: The main learning engine
   - Manages knowledge storage
   - Implements adaptive learning
   - Handles system integrations

2. **NeuralDashboard**: Visualization and monitoring
   - Real-time metrics display
   - Status monitoring
   - Knowledge view

3. **Integration Layer**: External system connections
   - Custom handler registration
   - Event triggering
   - Bidirectional communication

## Growth Metrics

The system tracks:
- **Knowledge Size**: Number of learned items
- **Adaptability Score**: Current learning rate percentage
- **Integration Level**: Number of connected systems

## Status Levels

- **Initializing**: Starting up, no knowledge yet
- **Learning**: Acquiring initial knowledge (< 10 items)
- **Growing**: Expanding knowledge base (≥ 10 items)
- **Integrated**: Connected to external systems

## License

MIT
