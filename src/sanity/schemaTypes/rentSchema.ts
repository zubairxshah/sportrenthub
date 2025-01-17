import { SchemaTypeDefinition } from 'sanity'

import user from '../../app/schemas/user'
import admin from '../../app/schemas/admin'
import equipment from '../../app/schemas/equipment'
import rental from '../../app/schemas/rental'
import payment from '../../app/schemas/payment'
import review from '../../app/schemas/review'
import category from '../../app/schemas/category'
import penalty from '../../app/schemas/penalty'
import shipment from '../../app/schemas/shipment'
import delivery from '../../app/schemas/delivery'
import returnSchema from '../../app/schemas/return'

export const rentSchema: { types: SchemaTypeDefinition[] } = {
  types: [
    user,
    admin,
    equipment,
    rental,
    payment,
    review,
    category,
    penalty,
    shipment,
    delivery,
    returnSchema
  ],
}
