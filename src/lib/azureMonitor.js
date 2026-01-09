import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({ config: {
  connectionString: import.meta.env.VITE_APP_INSIGHTS_CONN_STRING,
  enableAutoRouteTracking: true, // Tracks page views automatically
  enableCorsCorrelation: true,
}});

appInsights.loadAppInsights();

export default appInsights;