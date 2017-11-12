export enum AsdPingStatus {
  online, offline, pending
}

export interface AsdUrlPingStatusItem {
  pingItem: AsdUrlPingItem;
  currentStatus: AsdPingStatus;
}

export interface AsdUrlPingItem {
  url: string;
  title: string;
  description: string;
  isFavorite: boolean;
}

export interface AsdAppConfiguration {
  pingItems: Array<AsdUrlPingItem>;
}

export interface AsdSocketResponse {
  url: string;
  available: boolean;
}
