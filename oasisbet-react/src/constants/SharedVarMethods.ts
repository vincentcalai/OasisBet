import SharedVarConstants from "./SharedVarConstants.ts";

export class SharedVarMethods {
    static mapBetTypeCd(betType){
        switch(betType) {
            case SharedVarConstants.BET_TYPE_CD_H2H: {
                return SharedVarConstants.BET_TYPE_H2H_NAME;
            }
            default: {
            return '';
            }
        }
    }

    static clearSessionStorage() {
        sessionStorage.removeItem(SharedVarConstants.AUTH_USER);
        sessionStorage.removeItem(SharedVarConstants.AUTHORIZATION);
        sessionStorage.removeItem(SharedVarConstants.LOGIN_TIME);
        sessionStorage.removeItem(SharedVarConstants.LAST_AUTH_TIME);
    }
}

export default SharedVarMethods;