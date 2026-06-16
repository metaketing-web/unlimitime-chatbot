export interface ToolStatus {
  connected: boolean;
  provider: string;
  message: string;
  requiresConfirmation: boolean;
}

export function toolUnavailable(provider: string, message: string, requiresConfirmation = false): ToolStatus {
  return {
    connected: false,
    provider,
    message,
    requiresConfirmation
  };
}
