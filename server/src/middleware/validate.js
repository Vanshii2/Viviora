import { z } from 'zod';
import { HttpError } from '../utils/httpError.js';

/**
 * Validates and replaces req.body / req.query / req.params with parsed Zod output.
 * Usage: validate({ body: schema, query: schema, params: schema })
 */
export function validate(schemas) {
  return (req, _res, next) => {
    for (const [part, schema] of Object.entries(schemas)) {
      const result = schema.safeParse(req[part] ?? {});
      if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return next(
          new HttpError(
            400,
            'VALIDATION_ERROR',
            'Please check the highlighted fields.',
            fieldErrors,
          ),
        );
      }
      // Express 5 exposes req.query as a getter, so store parsed values on req.validated.
      req.validated = { ...req.validated, [part]: result.data };
    }
    return next();
  };
}
