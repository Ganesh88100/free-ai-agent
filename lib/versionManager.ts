import { UIPlan } from './types';

export type UIRevision = {
  id: number;
  parentVersion: number | null;
  versionNumber: number;
  plan: UIPlan;
  generatedCode: string;
  explanation: string;
  createdAt: number;
};

class VersionStore {
  private versions: UIRevision[] = [];

  add(plan: UIPlan, generatedCode: string, explanation: string): UIRevision {
    const latest = this.versions[this.versions.length - 1];
    const revision: UIRevision = {
      id: this.versions.length + 1,
      parentVersion: latest?.versionNumber ?? null,
      versionNumber: (latest?.versionNumber ?? 0) + 1,
      plan,
      generatedCode,
      explanation,
      createdAt: Date.now()
    };
    this.versions.push(revision);
    return revision;
  }

  list(): UIRevision[] {
    return [...this.versions];
  }

  rollback(versionNumber: number): UIRevision | undefined {
    const found = this.versions.find((v) => v.versionNumber === versionNumber);
    if (found) this.versions = this.versions.filter((v) => v.versionNumber <= versionNumber);
    return found;
  }
}

export const versionManager = new VersionStore();
