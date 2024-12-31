import { Button, Flex } from '@radix-ui/themes';
import { ColDef, ColGroupDef, colorSchemeDark, IDatasource, IGetRowsParams, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Method, sendRequest } from '../../../clients/api';
import { useDarkMode } from '../../../hooks/useDarkMode';
import { getCurrentTeam } from '../../../state/selectors/teams';
import { Link } from '../link';

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
      cellRenderer: (params: { data: { target: { slug: string; name: string } } }) => {
        if (params.data?.target) {
          return <Link to={`/targets/${params.data?.target?.slug}/`}>{params.data?.target?.name}</Link>;
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
      field: 'nextExecution',
      headerName: 'Next Execution',
      sortable: true,
      filter: true,
      flex: 1,
      valueGetter: (params) => params.data?.nextExecution,
      cellRenderer: (params: { value: string }) => {
        return params.value && moment(params.value).format('YYYY-MM-DD / HH:mm');
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filter: false,
      cellRenderer: (params: { value: { slug: string; cron: string } }) =>
        params.value && (
          <Button
            size='1'
            variant='surface'
            className='my-2'
            /**
             * Not yet. Will come in a new PR.
             */
            // onClick={() => handleClick(params.value.slug, params.value.cron)}
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
        params.successCallback(result, result.length);
        setLoading(false);
      },
    }),
    [currentTeam?.id, projectUUID, refresh]
  );

  /**
   * Represents the grid theme based on the dark mode state.
   */
  const gridTheme = isDarkMode ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;

  return (
    <Flex className='my-4'>
      <div style={{ width: '100%', height: 500 }}>
        <AgGridReact
          theme={gridTheme}
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
