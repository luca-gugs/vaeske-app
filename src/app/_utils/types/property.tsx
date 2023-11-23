type Property = {
  userId: string;
  id: number;
  streetAddress: string;
  streetAddress2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string | null;
  ehv: number | null;
  mb: number | null;
  ltv: number | null;
  liens: number | null;
  createdAt?: Date;
  matchCount?: number;
};
