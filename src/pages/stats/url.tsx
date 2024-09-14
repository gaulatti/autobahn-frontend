import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Button, Field, Spinner, Title1, Title2 } from '@fluentui/react-components';
import { Box, Container, Flex, Section, Select } from '@radix-ui/themes';
import { DateRangePicker, DateRangePickerValue, Divider } from '@tremor/react';
import { ColDef, ColGroupDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Method, sendRequest } from '../../clients/api';
import { CoreWebVitalCard, CoreWebVitalStats } from '../../components/foundations/cwv-card';
import { LighthouseScore, LighthouseScoreCard } from '../../components/foundations/lighthouse-card';
import { Link } from '../../components/foundations/link';
import { URLNavbar } from '../../components/foundations/url-navbar';

const semaphoreColors = ['#7f8c8d', '#f6b93b', '#27ae60', '#27ae60', '#27ae60', '#c0392b', '#f6b93b'];

type TData = {
  uuid: string;
  created_at: string;
  results: string;
  heartbeats: { mode: number; status: number; retries: number }[];
};

const URLStats = () => {
  const { uuid } = useParams();
  const [loadingExecutions, setLoadingExecutions] = useState<boolean>(false);
  const [statistic, setStatistic] = useState<string>('p90');
  const [url, setUrl] = useState<string>();
  const [scores, setScores] = useState<{ name: string; scores: LighthouseScore }[]>([]);
  const [cwvStats, setCWVStats] = useState<{ name: string; stats: CoreWebVitalStats }[]>([]);
  const [dashboardRange, setDashboardRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const retryExecution = useCallback(async (mode: number, uuid: string) => {
    await sendRequest(Method.POST, `executions/${uuid}/${mode === 0 ? 'mobile' : 'desktop'}/retry`);
  }, []);

  const gridRef = useRef<AgGridReact>(null);

  const colDefs: (ColDef | ColGroupDef)[] = [
    {
      field: 'created_at',
      headerName: 'Triggered',
      cellRenderer: (params: { data: TData }) => {
        return params.data && moment(params.data!.created_at).fromNow();
      },
      filter: 'agDateColumnFilter',
      initialSort: 'desc',
      sortingOrder: ['desc', 'asc'],
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      flex: 1,
    },
    {
      headerName: 'Status',
      flex: 1,
      children: [
        {
          field: 'status',
          headerName: 'Desktop',
          width: 150,
          valueGetter: (params) => {
            return params.data?.heartbeats?.find((i: { mode: number }) => i.mode == 1);
          },
          filter: true,
          flex: 1,
          cellStyle: (params) => {
            const color = params.value && semaphoreColors[params.value!.status];
            return {
              borderLeftColor: color || '',
              borderLeftWidth: '5px',
              borderLeftStyle: 'solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            };
          },
          cellRenderer: (params: { value: { status: number; retries: number }; data: { uuid: string } }) => {
            switch (params.value?.status) {
              case 0:
                return 'Pending';
              case 1:
                return 'Running';
              case 2:
                return 'Lighthouse Finished';
              case 3:
                return 'Pleasantness Finished';
              case 4:
                return (
                  <Link to={`/executions/${params?.data?.uuid}/desktop`} className='w-full'>
                    View Results
                  </Link>
                );
              case 5:
                return (
                  <Button onClick={() => retryExecution(1, params?.data?.uuid)} className='w-full'>
                    Retry
                  </Button>
                );
              case 6:
                return 'Retrying';
            }
          },
        },
        {
          field: 'status',
          headerName: 'Mobile',

          width: 150,
          filter: true,
          valueGetter: (params) => {
            return params.data?.heartbeats?.find((i: { mode: number }) => i.mode == 0);
          },
          cellRenderer: (params: { value: { status: number; retries: number }; data: { uuid: string } }) => {
            switch (params.value?.status) {
              case 0:
                return 'Pending';
              case 1:
                return 'Running';
              case 2:
                return 'Lighthouse Finished';
              case 3:
                return 'Pleasantness Finished';
              case 4:
                return (
                  <Link to={`/executions/${params?.data?.uuid}/mobile`} className='w-full'>
                    View Results
                  </Link>
                );
              case 5:
                return (
                  <Button onClick={() => retryExecution(0, params?.data?.uuid)} className='w-full'>
                    Retry
                  </Button>
                );
              case 6:
                return 'Retrying';
            }
          },
          flex: 1,
          cellStyle: (params) => {
            const color = params.value && semaphoreColors[params.value!.status];
            return {
              borderLeftColor: color || '',
              borderLeftWidth: '5px',
              borderLeftStyle: 'solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            };
          },
        },
      ],
    },
  ];

  useEffect(() => {
    if (uuid && dashboardRange.from && dashboardRange.to) {
      const queryParams = {
        from: dashboardRange.from!.toISOString(),
        to: dashboardRange.to!.toISOString(),
        statistic,
      };

      sendRequest(Method.GET, `stats/url/${uuid}`, queryParams).then((result) => {
        const {
          urlRecord: { url },
          scores,
          cwvStats,
        } = result;

        setUrl(url);
        if (scores) {
          setScores(scores);
        }

        if (cwvStats) {
          setCWVStats(cwvStats);
        }
      });
    }
  }, [dashboardRange, statistic, uuid]);

  const dataSource: IDatasource = useMemo(
    () => ({
      rowCount: undefined,

      getRows: async (params: IGetRowsParams) => {
        if (uuid && dashboardRange.from && dashboardRange.to) {
          setLoadingExecutions(true);
          const queryParams = {
            sort: params.sortModel.map((sort) => `${sort.colId},${sort.sort}`).join(';'),
            filters: JSON.stringify(params.filterModel),
            startRow: params.startRow,
            endRow: params.endRow,
            from: dashboardRange.from!.toISOString(),
            to: dashboardRange.to!.toISOString(),
          };

          const result = await sendRequest(Method.GET, `stats/url/${uuid}/executions`, queryParams);

          params.successCallback(result.pulses.rows, result.pulses.count);
          setLoadingExecutions(false);
        }
      },
    }),
    [uuid, dashboardRange]
  );

  return (
    <Container>
      <Section size='1'>
        <Title1>URL Statistics</Title1>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Stats</BreadcrumbItem>
        </Breadcrumb>
        {(url && uuid) ? (
          <>
            <URLNavbar uuid={uuid} url={url} />
            <Divider />
            <Section size='1'>
              <Flex gap='3' justify='between'>
                <Box>
                  <Field label='Statistic'>
                    <Select.Root
                      value={statistic}
                      onValueChange={(e) => {
                        setStatistic(e);
                      }}
                    >
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Statistic</Select.Label>
                          <Select.Item key='average' value='average'>
                            Average
                          </Select.Item>
                          <Select.Item key='p99' value='p99'>
                            p99
                          </Select.Item>
                          <Select.Item key='p90' value='p90'>
                            p90
                          </Select.Item>
                          <Select.Item key='p50' value='p50'>
                            p50
                          </Select.Item>
                          <Select.Item key='max' value='max'>
                            Max
                          </Select.Item>
                          <Select.Item key='min' value='min'>
                            Min
                          </Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </Field>
                </Box>
                <Box>
                  <Field label='Date Range'>
                    <DateRangePicker className='mx-auto max-w-sm' enableSelect={false} value={dashboardRange} onValueChange={setDashboardRange} />
                  </Field>
                </Box>
              </Flex>
            </Section>
            <Divider />
            <Section size='1'>
              <Title2>Lighthouse Scores ({statistic})</Title2>
              <Flex direction='row' wrap='wrap' gap='3' className='my-4'>
                {scores.map((score) => (
                  <LighthouseScoreCard name={score.name} scores={score.scores} />
                ))}
              </Flex>
            </Section>
            <Section size='1'>
              <Title2>Core Web Vitals ({statistic})</Title2>
              <Flex direction='row' wrap='wrap' gap='3' className='my-4'>
                {cwvStats.map((stat) => (
                  <CoreWebVitalCard name={stat.name} stats={stat.stats} currentStat={statistic} />
                ))}
              </Flex>
            </Section>
            <Divider />
            <Section size='1'>
              <Title2>Executions List</Title2>
              <Flex className='my-4'>
                <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
                  <AgGridReact
                    datasource={dataSource}
                    ref={gridRef}
                    rowModelType='infinite'
                    loading={loadingExecutions}
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
            </Section>
          </>
        ) : (
          <div className='spinner-overlay'>
            <Spinner size='huge' />
          </div>
        )}
      </Section>
    </Container>
  );
};

export { URLStats };
