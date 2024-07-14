
const SharedVarMethods = {
    mapBetTypeCd(betType){
        switch(betType) {
            case this.BET_TYPE_CD_H2H: {
                return this.BET_TYPE_H2H_NAME;
            }
            default: {
            return '';
            }
        }
    }
}

export default SharedVarMethods;