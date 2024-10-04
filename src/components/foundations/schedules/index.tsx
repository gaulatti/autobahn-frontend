import { Button, Flex } from '@radix-ui/themes';
import { ColDef, ColGroupDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Method, sendRequest } from '../../../clients/api';
import { useDarkMode } from '../../../hooks/useDarkMode';
import { getCurrentTeam } from '../../../state/selectors/teams';
import { Link } from '../link';
import moment from 'moment';

/**
 * SchedulesTable component renders a table displaying schedules for a given project.
 * It uses AgGridReact for displaying the data in a tabular format with infinite scrolling.
 *
 * @param {Object} props - The component props.
 * @param {string} props.projectUUID - The UUID of the project for which schedules are displayed.
 * @returns {JSX.Element} The rendered SchedulesTable component.
 *
 * @component
 *
 * @example
 * // Usage example:
 * <SchedulesTable projectUUID="123e4567-e89b-12d3-a456-426614174000" />
 *
 * @remarks
 * - The table supports sorting and filtering.
 * - The data source for the table is fetched asynchronously.
 * - The component adapts to dark mode based on the `isDarkMode` context.
 * - The `currentTeam` is fetched from the Redux store using `useSelector`.
 */
const SchedulesTable = ({ projectUUID, refresh }: { projectUUID: string; refresh: number }): JSX.Element => {
  /**
   * Represents the current team.
   */
  const currentTeam = useSelector(getCurrentTeam)!;

  /**
   * Represents the dark mode.
   */
  const { isDarkMode } = useDarkMode();

  /**
   * Represents the loading state.
   */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Represents the column definitions for the table.
   */
  const colDefs: (ColDef | ColGroupDef)[] = [
    {
      field: 'target.name',
      headerName: 'Target',
      sortable: true,
      filter: true,
      flex: 1,
      cellRenderer: (params: { data: { target: { uuid: string; name: string } } }) => {
        if (params.data?.target) {
          return <Link to={`/targets/${params.data?.target?.uuid}/`}>{params.data?.target?.name}</Link>;
        }
      },
    },
    {
      field: 'cron',
      headerName: 'Cron Expression',
      sortable: true,
      filter: true,
      flex: 1,
      valueGetter: (params) => params.data?.cron,
      cellRenderer: (params: { value: string }) => {
        if (params.value) {
          return params.value;
        }
      },
    },
    {
      field: 'next_execution',
      headerName: 'Next Execution',
      sortable: true,
      filter: true,
      flex: 1,
      valueGetter: (params) => params.data?.next_execution,
      cellRenderer: (params: { value: string }) => {
        return params.value && moment(params.value).format('YYYY-MM-DD / HH:mm');
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filter: false,
      cellRenderer: (params: { value: { uuid: string; cron: string } }) =>
        params.value && (
          <Button
            size='1'
            variant='surface'
            className='my-2'
            /**
             * Not yet. Will come in a new PR.
             */
            // onClick={() => handleClick(params.value.uuid, params.value.cron)}
          >
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
        setLoading(true);
        const queryParams = {
          sort: params.sortModel.map((sort) => `${sort.colId},${sort.sort}`).join(';'),
          filters: JSON.stringify(params.filterModel),
          startRow: params.startRow,
          endRow: params.endRow,
          team: currentTeam?.id,
        };

        const result = await sendRequest(Method.GET, `projects/${projectUUID}/schedules`, queryParams);
        params.successCallback(result.schedules, result.schedules.length);
        setLoading(false);
      },
    }),
    [currentTeam?.id, projectUUID, refresh]
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

export { SchedulesTable };