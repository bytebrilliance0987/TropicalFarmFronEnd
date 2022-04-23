export interface stockCreationDTO{
    placeName: string;
    addressNO: string;
    firstAddressLine: string;
    secondAddressLine: string;
    city: string;
    zipPostalCode: string
    district: string;
}

export interface stockDTO{
    stockID: number;
    placeName: string;
    addressNO: string;
    firstAddressLine: string;
    secondAddressLine: string;
    city: string;
    zipPostalCode: string
    district: string;
    addedDate: string;
    addedtime: string
}