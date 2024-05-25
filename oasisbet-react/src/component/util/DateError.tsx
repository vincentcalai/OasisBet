import React from 'react';
import './DateError.css';

const DateError = ({ dateErrorMsg }) => {
    return (
        <>
            <br />
        <div className="row">
                <div className="col-md-6 offset-md-1">
                    <label className={`error-text ${dateErrorMsg ? 'highlightLabel' : ''}`}>
                        {dateErrorMsg && <span>{dateErrorMsg}</span>}
                    </label>
                </div>
            </div>
        </>
    );
};

export default DateError;