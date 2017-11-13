export enum AsdPingStatus {
  online, offline, pending
}

export interface AsdUrlPingItem {
  url: string;
  title: string;
  description: string;
  isFavorite: boolean;
  currentStatus: AsdPingStatus;
}

export interface AsdAppConfiguration {
  pingItems: Array<AsdUrlPingItem>;
}

export interface AsdSocketResponse {
  url: string;
  available: boolean;
}
