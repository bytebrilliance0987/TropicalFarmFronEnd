export interface supplierCreationDTO{
    nic: string;
    firstName: string;
    lastName: string;
    phoneNumber: any;
    email: string;
    addressNO: any;
    firstAddressLine: any;
    secondAddressLine: any;
    city: string;
    district: string;
    profilePicture: File;
}

export interface supplierEditDTO{
    nic: string;
    firstName: string;
    lastName: string;
    phoneNumber: any;
    email: string;
    addressNO: any;
    firstAddressLine: any;
    secondAddressLine: any;
    city: string;
    district: string;
    profilePicture: string;
}

export interface supplierDTO{
    supplierID: number;
    nic: string;
    firstName: string;
    lastName: string;
    phoneNumber: any;
    email: string;
    addressNO: any;
    firstAddressLine: any;
    secondAddressLine: any;
    city: string;
    district: string;
    addedDate: string;
    addedtime: string;
    profilePicture: string;
}