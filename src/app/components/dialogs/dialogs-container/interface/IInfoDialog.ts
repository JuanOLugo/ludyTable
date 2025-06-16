import { UserAddress, UserCompany } from "../../../table/interfaces/IUser";

export interface IinfoDialog{
    user: number,
    action: boolean,
    InfoCompany?:  UserCompany
    InfoAddress? :UserAddress
}