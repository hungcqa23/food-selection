import type { FunctionComponent } from '@/common/types';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Home = (): FunctionComponent => {
  const { t, i18n } = useTranslation();

  const onTranslateButtonClick = async (): Promise<void> => {
    if (i18n.resolvedLanguage === 'en') {
      await i18n.changeLanguage('es');
    } else {
      await i18n.changeLanguage('en');
    }
  };

  return (
    <div className='bg-background flex min-h-screen flex-col items-center justify-center space-y-8'>
      <div className='space-y-4 text-center'>
        <h1 className='text-foreground text-6xl font-bold'>{t('home.greeting')}</h1>
        <p className='text-muted-foreground text-lg'>
          Welcome to your Vite + React + shadcn/ui app!
        </p>
      </div>
      <button
        className='bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
        type='button'
        onClick={onTranslateButtonClick}
      >
        <Languages className='h-4 w-4' />
        Translate
      </button>
    </div>
  );
};
