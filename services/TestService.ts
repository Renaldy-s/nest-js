class TestService {
  async getTestResult(input: any): Promise<any> {
    return { test: 'Berhasil', input };
  }
}

export const testService = new TestService();
