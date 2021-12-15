const axios = require('axios');

jest.mock('axios');

describe('mock api calls', () => {
  const mockResponse = {data: {username: 'test-user', email: 'test@example.com'}}
  axios.get.mockResolvedValue(mockResponse);
  const suffixType = require('./suffixType.js')

  suffixType.suffixTypeAction();
})
