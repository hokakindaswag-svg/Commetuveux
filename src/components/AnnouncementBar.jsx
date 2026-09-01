import { useEffect, useState } from 'react';
import { SITE } from '../data/site';

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SITE.announcements.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="announce">
      <div className="announce__track">
        <p className="announce__item" key={i} aria-live="polite">
          {SITE.announcements[i]}
        </p>
      </div>
    </div>
  );
}
