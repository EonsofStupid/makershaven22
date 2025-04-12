
/**
 * Simple circuit breaker to prevent infinite loops or excessive function calls
 */
class CircuitBreaker {
  private tripCounts: Record<string, number> = {};
  private maxCalls: Record<string, number> = {};
  private resetIntervals: Record<string, number> = {};
  private timeouts: Record<string, NodeJS.Timeout> = {};

  /**
   * Initialize a circuit breaker for a specific key
   */
  public init(key: string, maxCalls: number = 5, resetInterval: number = 5000): void {
    this.tripCounts[key] = 0;
    this.maxCalls[key] = maxCalls;
    this.resetIntervals[key] = resetInterval;
  }

  /**
   * Reset the counter for a key
   */
  public reset(key: string): void {
    this.tripCounts[key] = 0;
    if (this.timeouts[key]) {
      clearTimeout(this.timeouts[key]);
      delete this.timeouts[key];
    }
  }

  /**
   * Increment the count for a key, returns false if the circuit should be broken
   */
  public count(key: string): boolean {
    if (!this.tripCounts.hasOwnProperty(key)) {
      this.init(key);
    }

    this.tripCounts[key]++;
    
    const isTripped = this.tripCounts[key] > this.maxCalls[key];
    
    // Auto-reset after the reset interval if tripped
    if (isTripped && !this.timeouts[key]) {
      this.timeouts[key] = setTimeout(() => {
        this.reset(key);
      }, this.resetIntervals[key]);
    }
    
    return isTripped;
  }

  /**
   * Check if the circuit is currently tripped
   */
  public isTripped(key: string): boolean {
    if (!this.tripCounts.hasOwnProperty(key)) {
      return false;
    }
    return this.tripCounts[key] > this.maxCalls[key];
  }
}

// Export a singleton instance
export default new CircuitBreaker();
