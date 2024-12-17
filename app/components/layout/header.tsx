import styled from '@emotion/styled';
import { Container } from '@radix-ui/themes';
import moment from 'moment';
import { Link } from 'react-router';
import { Menu } from './menu';

const HeaderBackground = styled.section`
  height: 66px;
  background: linear-gradient(to right, #d95107 50%, #f6931e 50%);
  display: flex;
  align-items: center;
  color: white;
`;

const HeaderContent = styled.section`
  background: #f6931e;
  height: 66px;
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  background: #d95107;
  height: 66px;
  display: inline-block;
  padding-right: 1rem;
  line-height: 66px;
  font-size: 2rem;
  font-family: 'Comodo', sans-serif;
`;

const StripeBox = styled.div`
  height: 66px;
  width: 30px;
  display: flex;
  margin-right: 1rem;
`;

const Stripe = styled.div`
  width: 15px;
  height: 100%;
  background: ${(props) => props.color};
`;

const MainContent = styled.section`
  flex-grow: 1;
  background: #f6931e;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  font-weight: bold;
`;

const Header = () => {
  return (
    <>
      <HeaderBackground>
        <Container>
          <HeaderContent>
            <Logo to='/'>madonna</Logo>
            <MainContent>
              <StripeBox>
                <Stripe color='#d95107CC' />
                <Stripe color='#d9510766' />
              </StripeBox>
              <span>{moment().format('MMMM D, YYYY')}</span>
            </MainContent>
          </HeaderContent>
        </Container>
      </HeaderBackground>
      <Menu />
    </>
  );
};

export { Header };
