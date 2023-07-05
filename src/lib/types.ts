export interface Data {
  success: boolean;
  error: string;
  sensor: {
    chipid: number;
    name: string;
    location: string;
  };
}
