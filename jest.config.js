module.exports = {
  "roots": [
    "<rootDir>/tests",
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
  },
  "testRegex": "test\\.tsx?$",
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "<rootDir>/tests/"
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": ["<rootDir>/tests/setupEnzyme.ts"],
}