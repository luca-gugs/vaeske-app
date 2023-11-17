type BuyBox = {
  orgId: string;
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  rules?: {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    buyBoxId: number;
    key: string;
    params: string;
    value: string;
    valueType: string;
  }[];
};
