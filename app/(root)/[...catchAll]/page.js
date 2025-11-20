// app/[...catchAll]/page.js
import NotFound from '../not-found';

export default function AdminCatchAll({ params }) {
  return <NotFound params={params} />;
}
