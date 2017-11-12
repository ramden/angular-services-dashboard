export enum AsdPingStatus {
  online, offline
}

export interface AsdUrlPingStatusItem {
  pingItem: AsdUrlPingItem;
  currentStatus: AsdPingStatus;
}

export interface AsdUrlPingItem {
  url: string;
  title: string;
  description: string;
  pingIntervalSeconds: number;
  isFavorite: boolean;
}

export interface AsdAppConfiguration {
  pingItems: Array<AsdUrlPingItem>;
}
