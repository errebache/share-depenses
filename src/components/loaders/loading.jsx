import React from 'react';
import loadingGif from '../../assets/imgs/theme/loading.gif';

function Loading() {
    return (
        <div id="preloader-active">
            <div className="preloader d-flex align-items-center justify-content-center">
                <div className="preloader-inner position-relative">
                    <div className="text-center">
                        <img src={loadingGif} alt="Chargement" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
