import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '5c1r82',
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config); // eslint-disable-line
      return config;
    },
    baseUrl: 'http://localhost:3000'
  }
});
