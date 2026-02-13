import { versionManager } from '@/lib/versionManager';

export async function GET() {
  return Response.json({ versions: versionManager.list() });
}

export async function POST(req: Request) {
  const { rollbackVersion } = await req.json();
  const revision = versionManager.rollback(Number(rollbackVersion));
  if (!revision) return new Response('Version not found', { status: 404 });
  return Response.json({ revision, versions: versionManager.list() });
}
