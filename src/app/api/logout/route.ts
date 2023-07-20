export async function POST(request: Request) {
  return new Response("Succesfully logged out", {
    status: 200,
    headers: { "Set-Cookie": "pb_auth=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT" },
  });
}
