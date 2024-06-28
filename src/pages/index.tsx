import { Flex } from 'antd';

const Home = () => {
  return (
    <>
      <header>
        <Flex justify='center'>
          <section>
            <Flex justify='space-between'>
              <div>logo + menu</div>
              <div>user menu</div>
            </Flex>
          </section>
        </Flex>
      </header>
      <main>
        <Flex justify='center'>
          <section>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/r0qDBYiOBrc'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </section>
        </Flex>
      </main>
    </>
  );
};

export { Home };
