import { useState } from "react";
import { usePopper } from "react-popper";

interface DropdownInterface {
  placement?: "top" | "bottom" | "left" | "right";
  buttonChildren?: any;
  dropdownChildren?: any;
  buttonClassName?: string;
  dropdownClassName?: string;
}

function Dropdown({
  placement,
  buttonChildren,
  dropdownChildren,
  buttonClassName,
  dropdownClassName,
}: DropdownInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  });

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button className={buttonClassName} ref={setReferenceElement} onClick={toggleDropdown}>
        {buttonChildren}
      </button>
      {isOpen && (
        <div className={dropdownClassName} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          {dropdownChildren}
        </div>
      )}
    </>
  );
}

export default Dropdown;
