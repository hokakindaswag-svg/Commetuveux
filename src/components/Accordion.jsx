import { useState } from 'react';
import { IconChevronDown } from './Icons';

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="acc">
      <button type="button" className="acc__btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {title}
        <IconChevronDown style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }} />
      </button>
      {open && <div className="acc__panel"><div className="acc__inner">{children}</div></div>}
    </div>
  );
}
