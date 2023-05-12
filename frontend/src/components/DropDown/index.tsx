import { useState } from "react";
import { usePopper } from "react-popper";

interface DropdownInterface {
  placement?: "top" | "bottom" | "left" | "right" | "top-start";
  buttonChildren?: any;
  dropdownChildren?: any;
  buttonClassName?: string;
  dropdownClassName?: string;
  offset?: any;
}

function Dropdown({
  placement,
  buttonChildren,
  dropdownChildren,
  buttonClassName,
  dropdownClassName,
  offset,
}: DropdownInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: offset ? offset : [0,0],
        },
      },
    ],
  });

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  function mouseHander() {
    toggleDropdown();
  }
  return (
    <>
      <button className={buttonClassName} ref={setReferenceElement} onClick={toggleDropdown}>
        {buttonChildren}
      </button>
      {isOpen && (
        <div
          onMouseLeave={mouseHander}
          className={dropdownClassName}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {dropdownChildren}
        </div>
      )}
    </>
  );
}

export default Dropdown;
