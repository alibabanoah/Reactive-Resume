import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect } from 'react';

import { useAppSelector } from '@/store/hooks';

const FontWrapper: React.FC = ({ children }) => {
  const typography = useAppSelector((state) => get(state.resume, 'metadata.typography'));

  const loadFonts = useCallback(async () => {
    const WebFont = (await import('webfontloader')).default;
    const families = Object.values<string>(typography.family).reduce(
      (acc, family) => [...acc, `${family}:400,600,700`],
      []
    );

    WebFont.load({ google: { families } });
  }, [typography]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isEmpty(typography)) {
      loadFonts();
    }
  }, [typography, loadFonts]);

  return <>{children}</>;
};

export default FontWrapper;