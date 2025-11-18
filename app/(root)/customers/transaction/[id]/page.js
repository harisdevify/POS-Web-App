import { use } from 'react';

const Page = ({ params }) => {
  const { id } = use(params);
  return <div>Transiction page {id}</div>;
};

export default Page;
