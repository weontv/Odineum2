import React, { useEffect, useState, useRef } from 'react';
import styles from './Dropdown.module.scss';

declare type PageProps = {
  selected: string;
  // eslint-disable-next-line react/require-default-props
  classProps?: string;
  lists: string[];
  handleSelect: (item: string) => void;
};

// eslint-disable-next-line import/prefer-default-export
export const CustomDropdown = ({
  selected,
  classProps,
  lists,
  handleSelect,
}: PageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const handleClickOutside = (event: any) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      if (isOpen) setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  });

  return (
    <div
      className={`relative ${classProps} flex justify-ccenter items-center text-md z-10 `}
    >
      <button
        type="button"
        id="menu-button"
        className={`flex justify-around items-center ${styles.button}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div>{selected}</div>
        <div>
          <img src="img/dropdown.png" alt="arrowdown" />
        </div>
      </button>

      {isOpen && (
        <div
          className={styles.dropdown}
          role="menu"
          ref={headerRef}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {lists &&
              lists.map((list: string, index: number) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className="font-dropdown block px-4 py-2"
                  role="menuitem"
                  tabIndex={-1}
                  id={`menu-item-${index}`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`menu-item-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(list);
                    setIsOpen(false);
                  }}
                >
                  {list}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
