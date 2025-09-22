import { useEffect } from 'react';

import getEnvValue from '@/utils/env';
import { ENVIRONMENT } from '@/constants/envs';

const SMALL_CONTAINER_CLASS = 'small-container';

const useSmallContainer = () => {
  useEffect(() => {
    const isSmallContainer = getEnvValue(ENVIRONMENT.ENABLE_SMALL_CONTAINER) === 'true';

    if (isSmallContainer) {
      document.body.classList.add(SMALL_CONTAINER_CLASS);
    } else {
      document.body.classList.remove(SMALL_CONTAINER_CLASS);
    }

    return () => {
      document.body.classList.remove(SMALL_CONTAINER_CLASS);
    };
  }, []);
};

export default useSmallContainer;
