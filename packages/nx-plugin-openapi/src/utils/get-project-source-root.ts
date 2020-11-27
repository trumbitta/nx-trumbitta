// Devkit
import { BuilderContext } from '@angular-devkit/architect';
import { workspaces } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';

// Third Parties
import { join } from 'path';

export async function getProjectSourceRoot(context: BuilderContext) {
  const workspaceHost = workspaces.createWorkspaceHost(new NodeJsSyncHost());
  const { workspace } = await workspaces.readWorkspace(context.workspaceRoot, workspaceHost);

  if (workspace.projects.get(context.target.project).sourceRoot) {
    return join(context.workspaceRoot, workspace.projects.get(context.target.project).sourceRoot);
  } else {
    context.reportStatus('Error');

    const message = `${context.target.project} does not have a source root. Please define one.`;
    context.logger.error(message);

    throw new Error(message);
  }
}
