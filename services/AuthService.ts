import { CustomException } from '../exceptions/CustomException';
import { EXCEPTION_MESSAGE } from '../exceptions/EXCEPTION_MESSAGE';
import { tools } from '../helpers/Tools';
import { partnerQuery } from '../sequelize/queries/PartnerQuery';
import { token } from '../middleware/jwt';

class AuthService {
  async getAccessKey(input: any): Promise<any> {
    if (input.type === 'GRANT_ACCESS_KEY') {
      const keyObject = input.key.split(' ');
      if (keyObject[0] === 'Basic') {
        const decodedKey = tools.base64Decode(keyObject[1]);
        const decodedKeyObject = decodedKey.split(':');
        const verifyKey = await partnerQuery.findOneByClientIdClientSecret(
          decodedKeyObject[0],
          decodedKeyObject[1],
        );
        if (verifyKey === null) {
          throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED, {
            message: 'Invalid credential key',
          });
        } else {
          const accessKey = token(verifyKey);
          const data = {
            type: 'Bearer',
            token: accessKey,
          };
          return data;
        }
      } else {
        throw new CustomException(EXCEPTION_MESSAGE.INVALID_CREDENTIAL, {
          message: 'Invalid key object',
        });
      }
    }
  }
}

export const authService = new AuthService();
