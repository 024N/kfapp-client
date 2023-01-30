import Joi from 'joi';

export const EnhancedOutages: any = Joi.object({
  params: Joi.object({
    siteId: Joi.string().required(),
  }),
  body: Joi.object({}),
  query: Joi.object({}),
  adminPermission: Joi.string().valid(true).required(),
});
