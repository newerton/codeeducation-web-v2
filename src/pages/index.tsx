import LayoutPrivate from 'layout/private';

const Home = () => {
  return <h1>Home</h1>;
};

export default Home;

Home.getLayout = function getLayout(page: any) {
  return <LayoutPrivate>{page}</LayoutPrivate>;
};
