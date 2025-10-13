export function loader() {
  return new Response(null, {
    status: 404,
    statusText: 'Not Found',
  });
}

export default function WellKnown() {
  return null;
}

export function meta() {
  return [{ title: 'Not Found' }];
}
