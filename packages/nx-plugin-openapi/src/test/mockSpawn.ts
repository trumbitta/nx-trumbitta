import { spawn } from 'child_process';
import EventEmitter from 'events';

export function mockSpawn(...invocations: { command: string; args: string[]; stdout?: string; exitCode: number }[]) {
  const mock = spawn as jest.Mock;
  for (const invocation of invocations) {
    mock.mockImplementationOnce((command: string, args: string[]) => {
      expect([command, ...args]).toEqual([invocation.command, ...invocation.args]);

      const child: any = new EventEmitter();
      child.stdin = new EventEmitter();
      child.stdin.write = jest.fn();
      child.stdin.end = jest.fn();
      child.stdout = new EventEmitter();
      child.stderr = new EventEmitter();

      if (invocation.stdout) {
        mockEmit(child.stdout, 'data', Buffer.from(invocation.stdout));
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
