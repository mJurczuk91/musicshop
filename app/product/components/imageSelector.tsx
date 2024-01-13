'use client'

import { useState } from "react";

type Props = {
    imgUrlArr:string[];
}

export default function ImageSelector({imgUrlArr}:Props){
    const [currentImage, setCurrentImage] = useState<string>(imgUrlArr[0]);
    return (
        <div>
            <div>
                <img src={currentImage} alt="product picture big"/>
            </div>
            <div>
                {
                    imgUrlArr.map( (img, i) => {
                        if(img !== currentImage) {
                            return <img 
                            src={img} 
                            alt="product picture small" 
                            onClick={() => setCurrentImage(img)} 
                            key={`${img.concat(i.toString())}`}
                            />
                        }     
                    })
                }
            </div>
        </div>
    )
}