import { Column } from '@tanstack/react-table';
import { cn } from 'src/lib/utils';
import { Button } from '../button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faSort } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation();

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{t(title as never)}</div>;
  }

  return (
    <Button
      variant="ghost"
      className="-ml-4"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {t(title as never)}

      {column.getIsSorted() === 'desc' ? (
        <FontAwesomeIcon icon={faArrowDown} className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'asc' ? (
        <FontAwesomeIcon icon={faArrowUp} className="ml-2 h-4 w-4" />
      ) : (
        <FontAwesomeIcon icon={faSort} className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
