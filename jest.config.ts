export default {
  //TODO: Cambiar el nombre del proyecto
  displayName: 'NOMBRE DEL PROYECTO',
  preset: './jest.preset.js',
  setupFilesAfterEnv: [
    'jest-preset-angular/setup-env/zone',
    '<rootDir>/src/setup-jest.ts'
  ],
  coverageReporters: [ 'html', 'text', 'lcov' ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.routes.ts',
    '!src/**/*.config.ts',
    '!src/**/*.development.ts',
    '!src/**/environment.ts',
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [ 'node_modules/(?!.*\\.mjs$)' ],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)',
  ],
};
