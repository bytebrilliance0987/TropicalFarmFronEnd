export interface itemCreationDTO{
    itemName: string;
    scientificName: string;
    itemType: string;
    weight: number;
    buyingPrice: number;
    supplierID: number;
    stockID: number
    companyID: number;
}

export interface itemSellDTO{
    itemID: number;
    itemName: string;
    scientificName: string;
    itemType: string;
    weight: number;
    buyingPrice: number;
    addedDate: string;
    addedtime: string;
    isSold: boolean;
    soldDateTime: string;
    soldMonth: string;
    soldYear: string;
    supplierID: number;
    stockID: number
    companyID: number;
}

export interface itemDTO{
    itemID: number;
    itemName: string;
    scientificName: string;
    itemType: string;
    weight: number;
    buyingPrice: number;
    addedDate: string;
    addedtime: string;
    isSold: boolean;
    soldDateTime: string;
    soldMonth: string;
    soldYear: string;
    supplierID: number;
    stockID: number
    companyID: number;
}

export interface ItemInStockWeightDTO{
    InStockWeight: any;
}

export interface ItemSoldWeightDTO{
    SoldWeight: any;
}

export interface ItemTotalBuyingPriceDTO{
    TotalBuyingPrice: any;
}