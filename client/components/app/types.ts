export type AgencyStatus = "Treated" | "InProgress" | "ToDo";

export type Agency = {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  status: AgencyStatus;
};
