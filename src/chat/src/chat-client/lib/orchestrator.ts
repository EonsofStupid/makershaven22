
import { ChatMode } from '../../../../shared/types/enums';
import { logger } from '../utils/logging';

const log = logger('ChatOrchestrator');

/**
 * Orchestrator service to manage different AI services based on chat mode
 */
export class ChatOrchestrator {
  private selectedProvider: string = 'default';
  
  constructor() {
    log.info('Initializing ChatOrchestrator');
  }
  
  /**
   * Select the appropriate service based on mode
   */
  selectServiceForMode(mode: ChatMode, message: string): string {
    // Log the selection process
    log.debug('Selecting service for mode', { 
      metadata: { mode, messageLength: message.length } 
    });
    
    // Determine service based on mode
    if (mode === 'developer' || mode === 'debug') {
      this.selectedProvider = 'code-assistant';
      log.info('Selected code-assistant provider');
    }
    else if (mode === 'training' || mode === 'planning') {
      this.selectedProvider = 'claude';
      log.info('Selected claude provider for structured tasks');
    }
    else if (mode === 'ultra') {
      this.selectedProvider = 'gpt4';
      log.info('Selected GPT-4 provider');
    }
    else if (mode === 'image') {
      this.selectedProvider = 'dalle';
      log.info('Selected DALL-E provider');
    }
    else {
      // Default to standard provider
      this.selectedProvider = 'standard';
      log.info('Selected standard provider');
    }
    
    return this.selectedProvider;
  }
  
  /**
   * Get appropriate system prompt based on mode
   */
  getSystemPromptForMode(mode: ChatMode): string {
    switch (mode) {
      case 'developer':
        return "You are a coding assistant, focused on helping with programming tasks. Provide code examples when appropriate.";
      case 'debug':
        return "You are a debugging assistant, focused on finding and fixing issues in code. Ask clarifying questions when needed.";
      case 'training':
        return "You are a training assistant, focused on educational content and structured learning paths.";
      case 'planning':
        return "You are a project planning assistant, focused on helping organize tasks, timelines, and resources.";
      case 'ultra':
        return "You are an advanced AI assistant with deep expertise across domains. Provide comprehensive, nuanced responses.";
      case 'image':
        return "You are a visual design assistant, focused on helping create and modify images and visual content.";
      default:
        return "You are a helpful assistant.";
    }
  }
}

// Export a singleton instance
export const chatOrchestrator = new ChatOrchestrator();
