class TestService {
  async getTestResult(payload: any) {
    return {test: 'Berhasil', payload};
  }
}

export const testService = new TestService();
