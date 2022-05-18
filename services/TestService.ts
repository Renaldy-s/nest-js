class TestService {
  async getTestResult(payload: any): Promise<any> {
    return {test: 'Berhasil', payload};
  }
}

export const testService = new TestService();
