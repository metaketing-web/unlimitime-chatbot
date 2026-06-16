import { toolUnavailable, type ToolStatus } from './common';

export async function getCalendarStatus(hasCredentials: boolean): Promise<ToolStatus> {
  if (!hasCredentials) {
    return toolUnavailable('calendar', 'Le connecteur agenda n’est pas encore branché.', true);
  }

  return {
    connected: true,
    provider: 'calendar',
    message: 'Agenda prêt.',
    requiresConfirmation: true
  };
}
