export enum ObjectType {
  Root = 'ROOT',
  Dir = 'DIR',
  File = 'FILE',
  Empty = 'EMPTY',
}

export type ObjectNode = {
  name: string;
  storage_object?: StorageObject;
  type: ObjectType;
  children: ObjectNode[];
  level: number,
  path: string
};

export type UploadBucket = {}

export type StorageObject = {
  key: string;
  lastModified: string;
  eTag: string;
  size: number;
  storage_class: string;
  owner: Owner;
  type: string;
};

export type Owner = {
  ID: string;
  display_name: string;
};

export type LocationBucket = {
  LocationConstraint: string;
  Error: {
    Code: string;
    BucketName: string;
    RequestId: string;
    HostId: string;
  };
};

export type Usage = {
  Usage: {
    Entries: string;
    Summary: {
      QuotaMaxBytes: number;
      QuotaMaxBuckets: number;
      QuotaMaxObjCount: number;
      QuotaMaxBytesPerBucket: number;
      QuotaMaxObjCountPerBucket: number;
      TotalBytes: number;
      TotalBytesRounded: number;
      TotalEntries: number;
    };
    CapacityUsed: {
      User: {
        Buckets: string;
      };
    };
  };
  code: number;
  errorMessage: string;
};

export type GetTreeObjectsResponse = {
  result: ObjectNode;
  bucket_name: string;
}
