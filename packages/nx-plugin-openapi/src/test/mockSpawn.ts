import { spawn } from 'child_process';
import EventEmitter from 'events';

export function mockSpawn(
  ...invocations: { command: string; args: string[]; stdout?: string; stderr?: string; exitCode: number }[]
) {
  const mock = spawn as jest.Mock;
  for (const invocation of invocations) {
    mock.mockImplementationOnce((command: string, args: string[], options: { stdio: 'ignore' | 'pipe' }) => {
      expect([command, ...args]).toEqual([invocation.command, ...invocation.args]);

      const child: any = new EventEmitter();
      child.stdin = new EventEmitter();
      child.stdin.write = jest.fn();
      child.stdin.end = jest.fn();
      if (options.stdio !== 'ignore') {
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
      }

      if (child.stdout && invocation.stdout) {
        mockEmit(child.stdout, 'data', Buffer.from(invocation.stdout));
      }

      if (child.stderr && invocation.stderr) {
        mockEmit(child.stderr, 'data', Buffer.from(invocation.stderr));
      }

      mockEmit(child, 'exit', invocation.exitCode ?? 0);

      return child;
    });
  }

  return () => {
    expect(mock).toHaveBeenCalledTimes(invocations.length);
  };
}

function mockEmit(emitter: EventEmitter, event: string, data: any) {
  setImmediate(() => {
    emitter.emit(event, data);
  });
}
