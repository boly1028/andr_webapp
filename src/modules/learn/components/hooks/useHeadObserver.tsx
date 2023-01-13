import { useEffect, useRef, useState } from "react"

export function useHeadsObserver(elements: Element[]) {
    const observer = useRef<IntersectionObserver>()
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        const handleObsever: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    console.log(entry.target.id,"Intersecting")
                    setActiveId(entry.target.id)
                }
            })
        }

        observer.current = new IntersectionObserver(
            handleObsever,
            {
                rootMargin: "-20% 0% -35% 0px"
            }
        )

        return () => observer.current?.disconnect()
    }, [])

    useEffect(() => {
        elements.forEach(element => {
            observer.current?.observe(element)
        })
    }, [elements, observer.current])

    return { activeId }
}