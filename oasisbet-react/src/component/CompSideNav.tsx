import React from 'react';
import './CompSideNav.css';

function CompSideNav({ compType, sharedVar, selectCompType }) {
    return (
        <div className="sidebar">
            <ul>
                <li className={`sidebar-item ${compType === sharedVar.API_SOURCE_COMP_TYPE_EPL ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(sharedVar.API_SOURCE_COMP_TYPE_EPL)}>{sharedVar.COMP_HEADER_EPL}</li>
                <li className={`sidebar-item ${compType === sharedVar.API_SOURCE_COMP_TYPE_LALIGA ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(sharedVar.API_SOURCE_COMP_TYPE_LALIGA)}>{sharedVar.COMP_HEADER_LALIGA}</li>
                <li className={`sidebar-item ${compType === sharedVar.API_SOURCE_COMP_TYPE_BUNDESLIGA ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(sharedVar.API_SOURCE_COMP_TYPE_BUNDESLIGA)}>{sharedVar.COMP_HEADER_BUNDESLIGA}</li>
                <li className={`sidebar-item ${compType === sharedVar.API_SOURCE_COMP_TYPE_SERIE_A ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(sharedVar.API_SOURCE_COMP_TYPE_SERIE_A)}>{sharedVar.COMP_HEADER_SERIE_A}</li>
                <li className={`sidebar-item ${compType === sharedVar.API_SOURCE_COMP_TYPE_LIGUE_ONE ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(sharedVar.API_SOURCE_COMP_TYPE_LIGUE_ONE)}>{sharedVar.COMP_HEADER_LIGUE_ONE}</li>
                <li className={`sidebar-item ${compType === sharedVar.API_SOURCE_COMP_TYPE_FA_CUP ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(sharedVar.API_SOURCE_COMP_TYPE_FA_CUP)}>{sharedVar.COMP_HEADER_FA_CUP}</li>
                <li className={`sidebar-item ${compType === sharedVar.API_SOURCE_COMP_TYPE_EFL_CUP ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(sharedVar.API_SOURCE_COMP_TYPE_EFL_CUP)}>{sharedVar.COMP_HEADER_EFL_CUP}</li>
                <li className={`sidebar-item ${compType === sharedVar.API_SOURCE_COMP_TYPE_UCL ? 'highlightSideNav' : ''}`} onClick={() => selectCompType(sharedVar.API_SOURCE_COMP_TYPE_UCL)}>{sharedVar.COMP_HEADER_UCL}</li>
            </ul>
        </div>
    );
}
  
export default CompSideNav;