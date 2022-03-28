import React, { useState, useRef, useEffect } from "react"
import FeatherIcon from 'feather-icons-react';

const accordion = ({ title, content, open }) => {

  const [isOpened, setOpened] = useState(open)
  const [height, setHeight] = useState("0px")
  const contentElement = useRef(null)

  const HandleOpening = () => {
    setOpened(!isOpened)
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px")
  }
  
  useEffect(() => {
    setHeight(isOpened ? `${contentElement.current.scrollHeight}px` : "0px")
  }, [])
  

  return (
    <div onClick={HandleOpening}>
      <div className={" flex gap-x-3 text-4xl align-middle justify-items-center m-auto"}>
        <h4 className="font-semibold text-xl">{title}</h4>
        {isOpened ? <FeatherIcon className="my-auto" size="18" icon="minus" />: <FeatherIcon className="my-auto" size="18" icon="plus" />}
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className=" overflow-hidden transition-all duration-200"
      >
        <p className="p-1 py-1 text-base text-gray-800" dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
    </div>
  )
}

export default accordion