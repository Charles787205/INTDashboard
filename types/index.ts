export type CourierType = {
  id?: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  courier_hub: HubType;
  courier_type: string;
  plate_number: string;
  is_active: boolean;
  gcash_number: string;
  gcash_name: string;
};

export type HubType = {
  id: number;
  name: string;
};
export type PortCodeType = {
  id?: number;
  code: string;
};
export type CoordinatesType = {
  id?: number;
  latitude: number;
  longitude: number;
};
export type AreaType = {
  id?: number;
  name: string;
  hub?: HubType;
  portCode?: PortCodeType;
  portCodes?: PortCodeType[];
  coordinates?: CoordinatesType[];
  parcel_count?: {
    failed: number;
    in_delivery: number;
    pending: number;
    success: number;
    total: number;
  };
};

export type UserType = {
  id: string;
  username: string;
  email: string;

  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  isActive: boolean;

  hub: number;
};
export type UserRequestType = {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  isActive?: boolean;
  hub: number;
  password?: string;
  confirmPassword?: string;
  date_request?: string | Date;
};

export type RunsheetType = {
  number: string;
  date_created: string;
  date: string;
  parcel_count?: number;
};
