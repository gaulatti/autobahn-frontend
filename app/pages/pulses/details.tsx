import { Container, Flex, Heading, Link as RadixLink, Section, Separator, Skeleton } from '@radix-ui/themes';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router';
// import React2LighthouseViewer from 'react2-lighthouse-viewer';
import { Method, useAPI } from '../../clients/api';
import { Link } from '../../components/foundations/link';
import { OverlaySpinner } from '../../components/foundations/spinners';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '../../components/ui/breadcrumb';

const PulseDetails = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();

  const viewportMode = useMemo(() => {
    return pathname.split('/').pop();
  }, [pathname]);

  const { data, loading } = useAPI(Method.GET, [], `pulses/${slug}/${viewportMode}`);
  const { data: dataJson } = useAPI(Method.GET, [], `pulses/${slug}/${viewportMode}/json`);
  const { data: dataJsonMinified } = useAPI(Method.GET, [], `pulses/${slug}/${viewportMode}/json?minified`);

  return (
    <Container>
      <Section size='1'>
        <Heading as='h1' className='text-left'>
          Pulse Detail
        </Heading>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {data?.target && (
              <>
                <BreadcrumbItem>
                  <Link to={`/targets/${data.target.slug}`}>{data.target.name}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>{data?.target ? <>Pulses</> : <Link to='/pulses'>Pulses</Link>}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{slug}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <b>Results ({viewportMode})</b>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className='my-4'>
          {loading && <OverlaySpinner />}
          <Section size='2'>
            <Flex gap='3' justify='center'>
              {dataJson && dataJsonMinified ? (
                <Flex gap='3' align='center'>
                  <RadixLink href={dataJson.signedUrl} target='_blank'>
                    Download Original JSON
                  </RadixLink>
                  <Separator orientation='vertical' />
                  <RadixLink href={dataJsonMinified.signedUrl} target='_blank'>
                    Download Simplified JSON
                  </RadixLink>
                </Flex>
              ) : (
                <Skeleton aria-label='Loading Content' />
              )}
            </Flex>
          </Section>
          {/* {data ? <React2LighthouseViewer json={JSON.parse(data.json)} /> : <></>} */}
        </section>
      </Section>
    </Container>
  );
};
export default PulseDetails;
