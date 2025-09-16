export type Project = {
  id: string;
  name: string;
  description?: string;

  variables: KeyValue[];

  auth: AuthConfig;

  rootFolder: FolderNode;
  // history: RequestHistoryEntry[];

  createdAt?: string;
  updatedAt?: string;
};

export type FolderNode = {
  id: string;
  name: string;
  type: "folder";
  auth: AuthConfig;

  children?: Array<FolderNode | RequestNode>;

  createdAt?: string;
  updatedAt?: string;
};

export type RequestNode = {
  id: string;
  name: string;
  type: "request";

  method: HttpMethod;
  url: string;

  headers: KeyValue[];
  queryParams: KeyValue[];
  body?: RequestBody;

  auth: AuthConfig;

  // examples: SavedExample[];

  createdAt?: string;
  updatedAt?: string;
};

export type AuthConfig =
  | { type: "no auth" }
  | { type: "inherit" }
  | { type: "bearer"; token: string }
  | { type: "basic"; username: string; password: string }
  | {
      type: "apiKey";
      key: string;
      location: "header" | "query";
      paramName: string;
    };

export type RequestBody =
  | {
      type: "raw";
      contentType: "application/json" | "text/plain";
      content: string;
    }
  | { type: "form-urlencoded"; fields: KeyValue[] };

export type SavedExample = {
  id: string;
  name: string;

  status: number;
  statusText?: string;

  headers: KeyValue[];
  body: string;

  savedAt: string;
};

export type RequestHistoryEntry = {
  id: string;
  requestId: string;
  method: HttpMethod;
  url: string;

  timestamp: string;
};

export type KeyValue = {
  key: string;
  value: string;
  enabled: boolean;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
