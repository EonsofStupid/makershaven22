
/**
 * A simple circuit breaker implementation to prevent infinite loops
 * in hooks and components
 */
class CircuitBreaker {
  private breakers: Map<string, { count: number; limit: number; timeWindow: number; lastReset: number }> = new Map();

  /**
   * Initialize a circuit breaker for a specific component or hook
   */
  init(id: string, limit: number = 5, timeWindow: number = 1000): void {
    if (!this.breakers.has(id)) {
      this.breakers.set(id, {
        count: 0,
        limit,
        timeWindow,
        lastReset: Date.now()
      });
    }
  }

  /**
   * Increment the counter for a circuit breaker
   * @returns true if the count was incremented, false if it hit the limit
   */
  count(id: string): boolean {
    if (!this.breakers.has(id)) {
      this.init(id);
    }

    const breaker = this.breakers.get(id)!;
    
    // Check if we should reset the counter due to time window
    if (Date.now() - breaker.lastReset > breaker.timeWindow) {
      breaker.count = 0;
      breaker.lastReset = Date.now();
    }
    
    // Check if the circuit is already tripped
    if (breaker.count >= breaker.limit) {
      return true;
    }
    
    // Increment the counter
    breaker.count++;
    return false;
  }

  /**
   * Check if a circuit breaker is tripped
   */
  isTripped(id: string): boolean {
    if (!this.breakers.has(id)) {
      return false;
    }
    
    const breaker = this.breakers.get(id)!;
    
    // Check if we should reset the counter due to time window
    if (Date.now() - breaker.lastReset > breaker.timeWindow) {
      breaker.count = 0;
      breaker.lastReset = Date.now();
      return false;
    }
    
    return breaker.count >= breaker.limit;
  }

  /**
   * Reset a circuit breaker
   */
  reset(id: string): void {
    if (this.breakers.has(id)) {
      const breaker = this.breakers.get(id)!;
      breaker.count = 0;
      breaker.lastReset = Date.now();
    }
  }

  /**
   * Clear all circuit breakers
   */
  clearAll(): void {
    this.breakers.clear();
  }
}

// Export singleton instance
const circuitBreaker = new CircuitBreaker();
export default circuitBreaker;
