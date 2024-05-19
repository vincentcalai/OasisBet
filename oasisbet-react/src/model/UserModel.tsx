export interface UserModel {
    id: number;
    username: string;
    password: string;
    email: string;
    contactNo: string;
    delInd: string;
    createdBy: string;
    createdDt: Date | null;
}
