import { App } from '@openedx/frontend-base';
import { appId } from './constants';
import routes from './routes';
import providers from './providers';
import slots from './slots';

const app: App = {
  appId,
  routes,
  providers,
  slots,
  config: {
    LEARNING_BASE_URL: 'http://apps.local.openedx.io:2000',
    ENABLE_PROGRAMS: false,
    ECOMMERCE_BASE_URL: '',
    ORDER_HISTORY_URL: '',
    SUPPORT_URL: '',
    SHOW_UNENROLL_SURVEY: false,
    ALGOLIA_APP_ID: 'IGSYV1Z1XI',
    ALGOLIA_SEARCH_API_KEY: '9b43cfe4f35ae59780d99ea70e3e239d',
    ALGOLIA_PRODUCT_INDEX_NAME: 'product',
  },
};

export default app;
