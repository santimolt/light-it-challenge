import { useState, useEffect } from 'react';

enum Breakpoint {
  Mobile = 0,
  Tablet = 768,
  Desktop = 1024,
  Large = 1280,
  ExtraLarge = 1536,
}

enum ColumnCount {
  Mobile = 1,
  Tablet = 2,
  Desktop = 2,
  Large = 3,
  ExtraLarge = 4,
}

/**
 * Hook to determine the number of columns based on screen size
 * @returns The number of columns to display based on current viewport width
 */
export const useColumnCount = () => {
  const getColumnCount = (): ColumnCount => {
    if (typeof window === 'undefined') return ColumnCount.Mobile;
    
    const width = window.innerWidth;
    
    if (width >= Breakpoint.ExtraLarge) return ColumnCount.ExtraLarge;
    if (width >= Breakpoint.Large) return ColumnCount.Large;
    if (width >= Breakpoint.Desktop) return ColumnCount.Desktop;
    if (width >= Breakpoint.Tablet) return ColumnCount.Tablet;
    return ColumnCount.Mobile;
  };

  const [columnCount, setColumnCount] = useState<ColumnCount>(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columnCount;
};

