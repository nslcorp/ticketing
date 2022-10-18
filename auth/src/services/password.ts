import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util';

const scriptAsync = promisify(scrypt)


export class Password {
  static toHash = async (password: string) => {
    const salt = randomBytes(8).toString('hex')
    const hash = await scriptAsync(password, salt, 64) as Buffer;

    return `${hash.toString('hex')}.${salt}`
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scriptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}


