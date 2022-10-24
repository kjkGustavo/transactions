import statusService from '~/server/services/status';
import { createRouter } from '~/server/router/context'

export const statusRouter = createRouter()
  .query("getAnalytics", {
    async resolve() {
      return await statusService.getAnalytics();
    },
  })