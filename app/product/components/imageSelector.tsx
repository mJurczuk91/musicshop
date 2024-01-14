'use client'

import { useEffect, useRef, useState } from "react";

type Props = {
    imgUrlArr: string[];
}

export default function ImageSelector({ imgUrlArr }: Props) {
    const [currentImage, setCurrentImage] = useState<string>(imgUrlArr[0]);
    const container = useRef<HTMLDivElement | null>(null);

    const handleScrollLeft = () => {
        if (!container.current) return;
        container.current.scrollLeft -= 150;
    };

    const handleScrollRight = () => {
        if (!container.current) return;
        container.current.scrollLeft += 150;
    }

    return (
        <div className=" max-w-full flex flex-col items-center">
            <div>
                <img
                    src={currentImage}
                    alt="product picture big"
                    className=" max-h-600"
                    onDragStart={(e: React.SyntheticEvent) => {
                        e.preventDefault()
                    }}
                />
            </div>
            <div className="flex flex-row items-center">
                <button onClick={handleScrollLeft} className="mr-4">
                    <img className="h-12 rotate-180" src="/svg/right-arrow.svg" alt="scroll left" />
                </button>
                <div
                    className="flex flex-row scroll-smooth overflow-scroll max-w-400 mt-2 mb-4 md:max-w-md no-scrollbar"
                    ref={container}
                >
                    {
                        imgUrlArr.map((img, i) => {
                            return <img
                                onDrag={(e: React.SyntheticEvent) => {
                                    e.preventDefault();
                                }}
                                src={img}
                                alt="product picture small"
                                onClick={() => setCurrentImage(img)}
                                key={`${img.concat(i.toString())}`}
                                className=" h-28 w-auto mx-2 hover:cursor-pointer"
                            />
                        })
                    }
                </div>
                <button onClick={handleScrollRight} className="ml-4">
                    <img className="h-12" src="/svg/right-arrow.svg" alt="scroll right" />
                </button>
            </div>
        </div>
    )
}