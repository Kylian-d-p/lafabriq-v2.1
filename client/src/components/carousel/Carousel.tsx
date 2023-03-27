import "./Carousel.scss"
import { useState, useEffect, useRef } from "react"
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface CarouselProps {
    pictures: Array<string>;
}

export default function Carousel(props: CarouselProps) {
    const [activeImageId, setactiveImageId] = useState<number>(0)
    const [images, setimages] = useState<Array<Array<any>>>([])
    const carouselRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        var new_images = []
        for (let i = 0; i < props.pictures.length; i++) {
            new_images.push([props.pictures[i], i])
        }
        setimages(new_images)
    }, [props.pictures])

    useEffect(() => {
        if (carouselRef.current !== null) {
            carouselRef.current.scrollTo(carouselRef.current.clientWidth * activeImageId, 0)
        }
    }, [activeImageId])

    useEffect(() => {
        var currentCarouselRefCopy = carouselRef.current
        carouselRef.current?.scrollTo(0, 0)
        const carouselScrollListener = () => {
            if (carouselRef.current !== null) {
                var tempScrollLeft = carouselRef.current.scrollLeft
                setTimeout(() => {
                    if (carouselRef.current !== null && tempScrollLeft === carouselRef.current.scrollLeft) {
                        setactiveImageId(Math.round(carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth - carouselRef.current.clientWidth) * (images.length - 1)))
                    }
                }, 100)
            }
        }
        if (carouselRef.current !== null) {
            carouselRef.current.addEventListener("scroll", carouselScrollListener)
        }
        return () => {
            currentCarouselRefCopy?.removeEventListener("scroll", carouselScrollListener)
        }
    }, [images])

    const handleArrowBack = () => {
        if (activeImageId > 0) {
            setactiveImageId(current => current - 1)
        }
    }

    const handleArrowForward = () => {
        if (activeImageId < images.length - 1) {
            setactiveImageId(current => current + 1)
        }
    }

    return (
        <div className="carousel-container">
            <MdArrowBack onClick={handleArrowBack} className={"arrow arrow-back " + (activeImageId === 0 ? "arrow-disabled" : "")} />
            <MdArrowForward onClick={handleArrowForward} className={"arrow arrow-forward " + (activeImageId === images.length - 1 ? "arrow-disabled" : "")} />
            <div className="carousel" ref={carouselRef}>
                {images.map((picture) => {
                    return (
                        <div key={picture[1]} className={"slide "}>
                            <img src={picture[0]} alt={picture[0]} className="slide-image" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}