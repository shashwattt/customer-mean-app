export interface Customer {
    _id: string;
    Email: string;
    DOB: string;
    Addresses: Address[];
    Phone: string;
    Mobile: string;
    Name: string;
  }

interface Address{
    _id: string;
    Pincode: string;
    State: string;
    Street: string;
    Flat: string;
}
