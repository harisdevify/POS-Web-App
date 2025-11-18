import { use } from 'react';

const Page = ({ params }) => {
  const { id } = use(params);
  return <div>Order page {id}</div>;
};

export default Page;
