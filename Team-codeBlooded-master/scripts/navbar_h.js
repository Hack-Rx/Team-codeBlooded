'use strict';

import React from 'react';
import htmlContent from 'Web%20Components/NavBar.html';
export default function navbar_h() {
    return (
        <div dangerouslySetInnerHTML={ {__html: htmlContent} } />
    );
}