import SharedVarConstants from "./SharedVarConstants.ts";

const SharedVarMethods = {
    mapBetTypeCd(betType){
        switch(betType) {
            case SharedVarConstants.BET_TYPE_CD_H2H: {
                return SharedVarConstants.BET_TYPE_H2H_NAME;
            }
            default: {
            return '';
            }
        }
    }
}

export default SharedVarMethods;