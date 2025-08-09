import { isProduction } from '@/common/utils';
import React from 'react';

export const ReactHookFormDevelopmentTools = isProduction
  ? (): null => null
  : React.lazy(() =>
      import('@hookform/devtools').then(result => ({
        default: result.DevTool
      }))
    );
