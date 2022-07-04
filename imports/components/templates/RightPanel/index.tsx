import React from 'react';
import { MdComputer } from 'react-icons/md';
import { HiLockClosed } from 'react-icons/hi';

import { ThemeContext } from '../../../contexts/ThemeContext';
import './styles.scss';

type RightPanelProps = {
  displayChat?: boolean;
};

const RightPanel = (props: RightPanelProps): JSX.Element => {
  const platform =
    navigator.platform === 'Win32'
      ? 'Windows'
      : navigator.platform === 'MacIntel'
      ? 'Mac'
      : navigator.platform === 'Linux x86_64'
      ? 'Linux'
      : 'Unknown';

  return (
    <div className="rightPanel">
      {props.displayChat ? (
        <div></div>
      ) : (
        <div className="rightPanel__container">
          <ThemeContext.Consumer>
            {({ isDark }) => (
              <img
                alt="background"
                className="rightPanel__image"
                src={
                  isDark
                    ? './images/phone-laptop-dark.png'
                    : './images/phone-laptop.png'
                }
              />
            )}
          </ThemeContext.Consumer>
          <h3 className="rightPanel__title">WhatsApp Web</h3>
          <p className="rightPanel__p">
            Envoyez et recevez désormais des messages sans avoir à garder votre
            téléphone en ligne.
          </p>
          <p className="rightPanel__p">
            Utilisez WhatsApp sur un maximum de 4 appareils et 1 téléphone,
            simultanément.
          </p>
          <div className="rightPanel__divider"></div>
          <div className="rightPanel__row">
            <MdComputer className="rightPanel__icon rightPanel__icon--normal" />
            <p className="rightPanel__p">
              Passez des appels depuis votre ordinateur avec WhatsApp pour{' '}
              {platform}.{' '}
              <a href="#" target="_blank" className="rightPanel__link">
                Obtenir l'application ici
              </a>
            </p>
          </div>
          <div className="rightPanel__footer">
            <div className="rightPanel__row">
              <HiLockClosed
                className="rightPanel__icon rightPanel__icon--small"
                style={{ marginRight: 5 }}
              />
              <p className="rightPanel__p">Chiffré de bout en bout</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
