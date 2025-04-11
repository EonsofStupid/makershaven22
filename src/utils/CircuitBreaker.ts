
/**
 * Simple circuit breaker utility to prevent infinite loops
 * and excessive operations.
 */
const CircuitBreaker = {
  breakers: new Map<string, { count: number; limit: number; tripped: boolean; timeout: number }>(),

  /**
   * Initialize a circuit breaker
   * @param key Unique identifier for this breaker
   * @param limit Number of operations before tripping
   * @param timeout Optional timeout to reset breaker (ms)
   */
  init(key: string, limit: number, timeout: number = 0): void {
    this.breakers.set(key, { count: 0, limit, tripped: false, timeout });
  },

  /**
   * Increment the counter for this breaker
   * @param key Breaker identifier
   * @returns True if increment successful, false if tripped
   */
  count(key: string): boolean {
    const breaker = this.breakers.get(key);
    if (!breaker) return false;
    
    if (breaker.tripped) return false;
    
    breaker.count += 1;
    if (breaker.count >= breaker.limit) {
      breaker.tripped = true;
      
      // Auto-reset after timeout if specified
      if (breaker.timeout > 0) {
        setTimeout(() => {
          this.reset(key);
        }, breaker.timeout);
      }
    }
    
    return !breaker.tripped;
  },

  /**
   * Check if a breaker is tripped
   * @param key Breaker identifier
   */
  isTripped(key: string): boolean {
    return this.breakers.get(key)?.tripped || false;
  },

  /**
   * Get current count for a breaker
   * @param key Breaker identifier
   */
  getCount(key: string): number {
    return this.breakers.get(key)?.count || 0;
  },

  /**
   * Reset a breaker
   * @param key Breaker identifier
   */
  reset(key: string): void {
    const breaker = this.breakers.get(key);
    if (breaker) {
      breaker.count = 0;
      breaker.tripped = false;
    }
  },

  /**
   * Reset all breakers
   */
  resetAll(): void {
    this.breakers.forEach((breaker, key) => {
      this.reset(key);
    });
  }
};

export default CircuitBreaker;
