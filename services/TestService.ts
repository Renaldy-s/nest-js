export class TestService {
  static async getTestResult(payload: any): Promise<any> {
    return {test: 'Berhasil', payload};
  }
}
