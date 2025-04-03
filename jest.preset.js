module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
      '^@app/(.*)$': '<rootDir>/src/app/$1',
      '^@assets/(.*)$': '<rootDir>/src/assets/$1',
      '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
      '^@envs/(.*)$': '<rootDir>/src/environments/$1',
    }
  };
  
  