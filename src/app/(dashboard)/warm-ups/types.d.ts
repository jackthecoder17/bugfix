type EmailMarketingProcess = {
  pageSize: number;
  index: number;
  totalResults: number;
  query: Record<string, never>;
  results: Array<{
    _id: string;
    name: string;
    createdAt: string; // ISO 8601 date string
    startedAt: string; // ISO 8601 date string
    state: string; // 'running' or other possible states
    mailserverName: string;
    clientEmailListName: string;
    replyEmailListName: string | null;
    userId: string;
    maxDays: number;
    increaseRate: number;
    startVolume: number;
    dailySendLimit: number;
    autoResponderEnabled: boolean;
    targetOpenRate: number;
    targetReplyRate: number;
    totalWarmupDays: number;
    totalAddressesMailed: number;
    currentWarmupDay: number;
    statusText: string | null;
    checked: boolean; // New field for checkbox
  }>;
};
