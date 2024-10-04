import { Button, Flex } from '@radix-ui/themes';
import { ColDef, ColGroupDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Method, sendRequest } from '../../../clients/api';
import { useDarkMode } from '../../../hooks/useDarkMode';
import { getCurrentTeam } from '../../../state/selectors/teams';
import { Link } from '../link';

/**
 * URLsTable component renders a table with URLs and provides functionalities
 * to view targets and trigger executions. It uses AgGridReact for displaying
 * the data in a grid format with infinite scrolling and server-side data fetching.
 *
 * @returns {JSX.Element} The URLsTable component.
 *
 * @remarks
 * - The component fetches data from the server using a custom data source.
 * - It uses `useSelector` to get the current team and `useNavigate` for navigation.
 * - The table columns include URL, Targets, and Trigger Execution buttons.
 * - The `handleClick` function triggers an execution and navigates to the execution page.
 * - The `dataSource` is memoized to optimize performance.
 *
 * @example
 * ```tsx
 * <URLsTable />
 * ```
 */
const URLsTable = ({ targetUUID }: { targetUUID?: string }): JSX.Element => {
  /**
   * Represents the current team.
   */
  const currentTeam = useSelector(getCurrentTeam)!;

  /**
   * Represents the navigator.
   */
  const navigator = useNavigate();

  /**
   * Represents the dark mode.
   */
  const { isDarkMode } = useDarkMode();

  /**
   * Handle form submission
   */
  const handleClick = useCallback(
    (url: string, uuid: string) => {
      /**
       * Send request to trigger execution
       */
      sendRequest(Method.POST, 'executions', { url, team: currentTeam.id }).then(() => {
        /**
         * Redirect to executions page after triggering execution
         */
        if (location.pathname !== `/urls/${uuid}`) {
          navigator(`/urls/${uuid}`);
        }
      });
    },
    [currentTeam.id, navigator]
  );

  const [loading, setLoading] = useState<boolean>(false);

  const colDefs: (ColDef | ColGroupDef)[] = [
    {
      field: 'url',
      sortable: true,
      headerName: 'URL',
      flex: 1,
      filter: true,
      initialSort: 'desc',
      sortingOrder: ['desc', 'asc'],
      valueGetter: (params) => params.data,
      cellRenderer: (params: { value: { url: string; uuid: string } }) => params.value && <Link to={`/urls/${params.value.uuid}`}>{params.value.url}</Link>,
    },
    {
      field: 'uuid',
      headerName: 'Trigger',
      sortable: false,
      filter: false,
      valueGetter: (params) => params.data,
      cellRenderer: (params: { value: { url: string; uuid: string } }) =>
        params.value && (
          <Button size='1' variant='surface' className='my-2' onClick={() => handleClick(params.value.url, params.value.uuid)}>
            Trigger Pulse
          </Button>
        ),
    },
  ];

  /**
   * This useMemo is used to create a custom data source for the AgGridReact component.
   */
  const dataSource: IDatasource = useMemo(
    () => ({
      rowCount: undefined,

      getRows: async (params: IGetRowsParams) => {
        /**
         * Fetch URLs from the server
         */
        const url = targetUUID ? `targets/${targetUUID}/urls` : 'urls';

        setLoading(true);
        const queryParams = {
          sort: params.sortModel.map((sort) => `${sort.colId},${sort.sort}`).join(';'),
          filters: JSON.stringify(params.filterModel),
          startRow: params.startRow,
          endRow: params.endRow,
          team: currentTeam?.id,
        };

        const result = await sendRequest(Method.GET, url, queryParams);

        params.successCallback(result.urls.rows, result.urls.count);
        setLoading(false);
      },
    }),
    [currentTeam?.id, targetUUID]
  );

  return (
    <Flex className='my-4'>
      <div className={`ag-theme-quartz${isDarkMode ? '-dark' : ''} w-full`} style={{ width: '100%', height: 500 }}>
        <AgGridReact
          datasource={dataSource}
          rowModelType='infinite'
          loading={loading}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
          sortingOrder={['desc', 'asc', null]}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 100 }}
        />
      </div>
    </Flex>
  );
};

export { URLsTable };