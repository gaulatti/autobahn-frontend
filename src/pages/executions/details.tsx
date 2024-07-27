import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbItem,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Divider,
  InfoLabel,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title1,
  Title2,
  Title3,
} from '@fluentui/react-components';

import { DocumentSearchRegular } from '@fluentui/react-icons';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { Method, useAPI } from '../../clients/api';
import { HistoryScoreChart } from '../../components/charts';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';

const ExecutionDetails = () => {
  const { uuid } = useParams();
  const { loading, data } = useAPI(Method.GET, [], `executions/${uuid}`);

  const records = useMemo(() => {
    if (data) {
      return { desktop: data.find((item: any) => item.mode === 1), mobile: data.find((item: any) => item.mode === 0) };
    }
  }, [data]);

  const timeline: Record<string, string | number>[] = useMemo(() => {
    const output: Record<string, string | number>[] = [];
    if (records) {
      output.push({ name: `Time to First Bit`, m: parseInt(records.mobile.ttfb), d: parseInt(records.desktop.ttfb) });
      output.push({ name: `First Contentful Paint`, m: parseInt(records.mobile.fcp), d: parseInt(records.desktop.fcp) });
      output.push({ name: `DOM Content Loaded`, m: parseInt(records.mobile.dcl), d: parseInt(records.desktop.dcl) });
      output.push({ name: `Speed Index`, m: parseInt(records.mobile.si), d: parseInt(records.desktop.si) });
      output.push({ name: `Largest Contentful Paint`, m: parseInt(records.mobile.lcp), d: parseInt(records.desktop.lcp) });
      output.push({ name: `Time to Interactive`, m: parseInt(records.mobile.tti), d: parseInt(records.desktop.tti) });
    }
    return output;
  }, [records]);

  const scores: Record<string, string | number>[] = useMemo(() => {
    const output: Record<string, string | number>[] = [];
    if (records) {
      output.push({ subject: `Performance`, m: parseInt(records.mobile.performance_score), d: parseInt(records.desktop.performance_score), fullMark: 100 });
      output.push({
        subject: `Accessibility`,
        m: parseInt(records.mobile.accessibility_score),
        d: parseInt(records.desktop.accessibility_score),
        fullMark: 100,
      });
      output.push({
        subject: `Best Practices`,
        m: parseInt(records.mobile.best_practices_score),
        d: parseInt(records.desktop.best_practices_score),
        fullMark: 100,
      });
      output.push({ subject: `SEO`, m: parseInt(records.mobile.seo_score), d: parseInt(records.desktop.seo_score), fullMark: 100 });
    }
    return output;
  }, [records]);

  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Beacon Execution Detail</Title1>
        <Breadcrumb aria-label='Breadcrumb default example'>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link to='/executions'>Executions</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>{uuid}</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <section>
          {loading && (
            <div className='spinner-overlay'>
              <Spinner size='huge' />
            </div>
          )}
          <HistoryScoreChart data={timeline} />
          <div className='container mx-auto'>
            <div className='flex flex-wrap md:flex-nowrap'>
              <div className='w-full md:w-1/2'>
                <ResponsiveContainer width='100%' height={300} className='my-4'>
                  <RadarChart data={scores}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey='subject' />
                    <PolarRadiusAxis angle={60} domain={[0, 100]} />
                    <Radar name='Desktop' dataKey='d' stroke='#2980b9' fill='#2980b9' fillOpacity={0.6} />
                    <Radar name='Mobile' dataKey='m' stroke='#d35400' fill='#d35400' fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className='w-full md:w-1/2'>
                {scores.length > 1 ? (
                  <div className='my-4'>
                    <h1>Performance Scores</h1>
                    <Table className='my-4'>
                      <TableHeader>
                        <TableRow>
                          <TableHeaderCell></TableHeaderCell>
                          <TableHeaderCell>Performance</TableHeaderCell>
                          <TableHeaderCell>Accessibility</TableHeaderCell>
                          <TableHeaderCell>Best Practices</TableHeaderCell>
                          <TableHeaderCell>SEO</TableHeaderCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableHeaderCell>Mobile</TableHeaderCell>
                          <TableCell>
                            <Title3>{scores[0].m}</Title3>
                          </TableCell>
                          <TableCell>
                            <Title3>{scores[1].m}</Title3>
                          </TableCell>
                          <TableCell>
                            <Title3>{scores[2].m}</Title3>
                          </TableCell>
                          <TableCell>
                            <Title3>{scores[3].m}</Title3>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHeaderCell>Desktop</TableHeaderCell>
                          <TableCell>
                            <Title3>{scores[0].d}</Title3>
                          </TableCell>
                          <TableCell>
                            <Title3>{scores[1].d}</Title3>
                          </TableCell>
                          <TableCell>
                            <Title3>{scores[2].d}</Title3>
                          </TableCell>
                          <TableCell>
                            <Title3>{scores[3].d}</Title3>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className='my-4 flex gap-4'>
                      <Button icon={<DocumentSearchRegular />}>View Mobile Details</Button>
                      <Button icon={<DocumentSearchRegular />}>View Desktop Details</Button>
                    </div>
                  </div>
                ) : (
                  <div className='spinner-overlay'>
                    <Spinner size='huge' />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Stack>
    </Container>
  );
};

export { ExecutionDetails };
