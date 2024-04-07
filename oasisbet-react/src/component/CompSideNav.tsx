import React from 'react';
import './CompSideNav.css';
import SharedVarConstants from '../constants/SharedVarConstants';

function CompSideNav({ compType, selectCompType }) {
    return (
        <div className="sidebar">
            <ul>
                <li className={`sidebar-item ${compType === SharedVarConstants.API_SOURCE_COMP_TYPE_EPL ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(SharedVarConstants.API_SOURCE_COMP_TYPE_EPL)}>{SharedVarConstants.COMP_HEADER_EPL}</li>
                <li className={`sidebar-item ${compType === SharedVarConstants.API_SOURCE_COMP_TYPE_LALIGA ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(SharedVarConstants.API_SOURCE_COMP_TYPE_LALIGA)}>{SharedVarConstants.COMP_HEADER_LALIGA}</li>
                <li className={`sidebar-item ${compType === SharedVarConstants.API_SOURCE_COMP_TYPE_BUNDESLIGA ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(SharedVarConstants.API_SOURCE_COMP_TYPE_BUNDESLIGA)}>{SharedVarConstants.COMP_HEADER_BUNDESLIGA}</li>
                <li className={`sidebar-item ${compType === SharedVarConstants.API_SOURCE_COMP_TYPE_SERIE_A ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(SharedVarConstants.API_SOURCE_COMP_TYPE_SERIE_A)}>{SharedVarConstants.COMP_HEADER_SERIE_A}</li>
                <li className={`sidebar-item ${compType === SharedVarConstants.API_SOURCE_COMP_TYPE_LIGUE_ONE ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(SharedVarConstants.API_SOURCE_COMP_TYPE_LIGUE_ONE)}>{SharedVarConstants.COMP_HEADER_LIGUE_ONE}</li>
                <li className={`sidebar-item ${compType === SharedVarConstants.API_SOURCE_COMP_TYPE_FA_CUP ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(SharedVarConstants.API_SOURCE_COMP_TYPE_FA_CUP)}>{SharedVarConstants.COMP_HEADER_FA_CUP}</li>
                <li className={`sidebar-item ${compType === SharedVarConstants.API_SOURCE_COMP_TYPE_EFL_CUP ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(SharedVarConstants.API_SOURCE_COMP_TYPE_EFL_CUP)}>{SharedVarConstants.COMP_HEADER_EFL_CUP}</li>
                <li className={`sidebar-item ${compType === SharedVarConstants.API_SOURCE_COMP_TYPE_UCL ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(SharedVarConstants.API_SOURCE_COMP_TYPE_UCL)}>{SharedVarConstants.COMP_HEADER_UCL}</li>
            </ul>
        </div>
    );
}
  
export default CompSideNav;