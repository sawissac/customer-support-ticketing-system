import { useState, useEffect } from "react";
import { usePopper } from "react-popper";

interface DropdownInterface {
  placement?: "top" | "bottom" | "left" | "right" | "top-start" | "right-start";
  buttonChildren?: any;
  dropdownChildren?: any;
  buttonClassName?: string;
  dropdownClassName?: string;
  offset?: any;
  toggle?: boolean;
  width?: string;
  disable?:boolean;
}

function Dropdown({
  disable,
  placement,
  buttonChildren,
  dropdownChildren,
  buttonClassName,
  dropdownClassName,
  offset,
  toggle,
  width,
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
          offset: offset ? offset : [0, 0],
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

  useEffect(() => {
    toggleDropdown();
  }, [toggle]);

  return (
    <>
      <button
      disabled={disable}
        className={buttonClassName}
        ref={setReferenceElement}
        onClick={toggleDropdown}
      >
        {buttonChildren}
      </button>
      {isOpen && (
        <div
          onClick={toggleDropdown}
          onMouseLeave={mouseHander}
          className={dropdownClassName}
          ref={setPopperElement}
          style={{ ...styles.popper, width }}
          {...attributes.popper}
        >
          {dropdownChildren}
        </div>
      )}
    </>
  );
}

export default Dropdown;
