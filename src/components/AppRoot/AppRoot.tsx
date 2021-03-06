import React, { FC, useRef, useState } from 'react';
import { canUseDOM } from '../../lib/dom';
import { HasChildren } from '../../types';
import classNames from '../../lib/classNames';
import { AppRootContext } from './AppRootContext';
import withAdaptivity, { SizeType, AdaptivityProps } from '../../hoc/withAdaptivity';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';

export interface AppRootProps extends HasChildren, AdaptivityProps {
  embedded?: boolean;
  window?: Window;
}

function cleanupPortalRoots(window: Window) {
  const portalRoots = window.document.querySelector('.vkui__portal-root');
  if (portalRoots) {
    window.document.body.removeChild(portalRoots);
  }
}

function applyAdaptivityStyles(container: HTMLElement, sizeX: SizeType) {
  if (sizeX === SizeType.REGULAR) {
    container.classList.add('vkui--sizeX-regular');
  } else {
    container.classList.remove('vkui--sizeX-regular');
  }
}

const AppRoot: FC<AppRootProps> = ({ children, embedded, window, sizeX, hasMouse }) => {
  const rootRef = useRef<HTMLDivElement>();
  const [portalRoot, setPortalRoot] = useState<HTMLDivElement>(null);
  const doc = window.document.documentElement;
  const body = window.document.body;

  const initialized = useRef(false);

  if (canUseDOM && !initialized.current && !embedded) {
    doc.classList.add('vkui');
  }

  // one time initialization and cleanup
  useIsomorphicLayoutEffect(() => {
    const parentNode = rootRef.current.parentElement;

    if (embedded) {
      const portal = document.createElement('div');
      portal.classList.add('vkui__portal-root');
      body.appendChild(portal);
      setPortalRoot(portal);
      parentNode.classList.add('vkui__root', 'vkui__root--embedded');
    } else {
      parentNode.classList.add('vkui__root');
    }

    initialized.current = true;

    return () => {
      if (embedded) {
        parentNode.classList.remove('vkui__root', 'vkui__root--embedded', 'vkui--sizeX-regular');
        cleanupPortalRoots(window);
      } else {
        parentNode.classList.remove('vkui__root');
        body.classList.remove('vkui__root', 'vkui--sizeX-regular');
        doc.classList.remove('vkui');
      }
    };
  }, []);

  // adaptivity handler
  useIsomorphicLayoutEffect(
    () => applyAdaptivityStyles(embedded ? rootRef.current.parentElement : body, sizeX),
    [sizeX],
  );

  return (
    <div ref={rootRef} className={classNames('AppRoot', {
      'AppRoot--no-mouse': !hasMouse,
    })}>
      <AppRootContext.Provider value={{
        appRoot: rootRef,
        portalRoot: portalRoot,
        embedded,
      }}>
        {children}
      </AppRootContext.Provider>
    </div>
  );
};

AppRoot.defaultProps = {
  window: window,
};

export default withAdaptivity(AppRoot, {
  sizeX: true,
  hasMouse: true,
});
