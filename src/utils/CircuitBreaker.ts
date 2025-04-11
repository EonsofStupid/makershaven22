
/**
 * Simple circuit breaker pattern to prevent infinite loops
 */
export default class CircuitBreaker {
  private static circuits: Map<string, { count: number; threshold: number; reset: number }> = new Map();
  
  /**
   * Initialize a circuit with a threshold and reset timeout
   */
  static init(name: string, threshold = 5, resetMs = 2000): void {
    if (!this.circuits.has(name)) {
      this.circuits.set(name, { count: 0, threshold, reset: resetMs });
    }
  }
  
  /**
   * Increment counter and check if circuit is tripped
   */
  static count(name: string): boolean {
    const circuit = this.circuits.get(name);
    if (!circuit) {
      return false;
    }
    
    circuit.count++;
    
    if (circuit.count >= circuit.threshold) {
      setTimeout(() => {
        const c = this.circuits.get(name);
        if (c) {
          c.count = 0;
        }
      }, circuit.reset);
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Check if circuit is tripped without incrementing
   */
  static isTripped(name: string): boolean {
    const circuit = this.circuits.get(name);
    return circuit ? circuit.count >= circuit.threshold : false;
  }
  
  /**
   * Reset a circuit
   */
  static reset(name: string): void {
    const circuit = this.circuits.get(name);
    if (circuit) {
      circuit.count = 0;
    }
  }
}
