'use client'

import { useState } from "react";

type Props = {
    imgUrlArr: string[];
}

export default function ImageSelector({ imgUrlArr }: Props) {
    const [currentImage, setCurrentImage] = useState<string>(imgUrlArr[0]);
    return (
        <div className=" max-w-full flex flex-col items-center">
            <div>
                <img
                    src={currentImage}
                    alt="product picture big"
                    className=""
                />
            </div>
            <div className="flex flex-row overflow-hidden mt-2 mb-4">
                {
                    imgUrlArr.map((img, i) => {
                        return <img
                            src={img}
                            alt="product picture small"
                            onClick={() => setCurrentImage(img)}
                            key={`${img.concat(i.toString())}`}
                            className=" h-28 w-auto mx-2"
                        />
                    })
                }
            </div>
        </div>
    )
}