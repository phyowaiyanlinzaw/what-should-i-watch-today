type Status = 'info' | 'warn' | 'error' | 'success';
type Data = any;

export const logger = (status: Status, name: string, data: Data) => {
  return console.log(status, name, JSON.stringify(data, null, 2));
};
