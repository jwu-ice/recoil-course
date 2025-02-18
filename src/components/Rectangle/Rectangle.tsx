import {useContext} from "react"
import {ElementsContext, selectedElementState} from "../../Canvas"
import {Drag} from "../Drag"
import {RectangleContainer} from "./RectangleContainer"
import {RectangleInner} from "./RectangleInner"
import {useRecoilState} from "recoil"

export type ElementStyle = {
  position: {top: number; left: number}
  size: {width: number; height: number}
}

export type Element = {style: ElementStyle}

export const Rectangle = ({element, index}: {element: Element; index: number}) => {
  const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)
  const {setElement} = useContext(ElementsContext)

  return (
    <Drag
      position={element.style.position}
      onDrag={(position) => {
        setElement(index, {
          style: {
            ...element.style,
            position,
          },
        })
      }}
    >
      <div>
        <RectangleContainer
          position={element.style.position}
          size={element.style.size}
          onSelect={() => {
            setSelectedElement(index)
          }}
        >
          <RectangleInner selected={index === selectedElement} />
        </RectangleContainer>
      </div>
    </Drag>
  )
}
