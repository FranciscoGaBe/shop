import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const links = [
  { icon: faGithub, to: 'https://github.com/FranciscoGaBe/shop' },
  { icon: faLinkedin, to: 'https://www.linkedin.com/in/francisco-garrido-679084198/' },
];

const MainLayoutFooter: React.FC = () => (
  <footer className="bg-rose-700 text-white fixed left-0 right-0 bottom-0 h-16">
    <div className="h-full flex items-center justify-between px-4 md:px-8 relative">
      <p className="font-semibold">© Francisco Garrido Bear</p>
      <ul className="flex gap-8 font-bold">
        {
            links.map(({ icon, to }) => (
              <li key={to}>
                <a href={to} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={icon} />
                </a>
              </li>
            ))
          }
      </ul>
    </div>
  </footer>
);

export default MainLayoutFooter;
