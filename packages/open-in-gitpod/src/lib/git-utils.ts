// Third Parties
import { sync } from 'cross-spawn';

export const getRepoRoot = () => {
  return runGitCommand(['rev-parse', '--show-toplevel']);
};

export const getOriginUrl = () => {
  return runGitCommand(['config', 'remote.origin.url']);
};

export const getCurrentBranchName = () => {
  return runGitCommand(['branch', '--show-current']);
};

function runGitCommand(args: string[]): string {
  const { stdout } = sync('git', args);

  return stdout.toString().trim();
}
